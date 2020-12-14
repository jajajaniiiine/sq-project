const bcrypt = require("bcryptjs");
const {
  singleFieldOnlyMessage,
} = require("graphql/validation/rules/SingleFieldSubscriptions");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("../mail");
const { hasPermission } = require("../utils");
const stripe = require("../stripe");

const Mutations = {
  async createItem(parent, args, ctx, info) {
    //check if you are logged in or not
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    const item = await ctx.db.mutation
      .createItem(
        {
          data: {
            // use to create relationship between the item and the user.
            user: {
              connect: {
                id: ctx.request.userId,
              },
            },
            ...args,
          },
        },
        info
      )
      .catch((err) => err);

    return item;
  },

  updateItem(parent, args, ctx, info) {
    // copy of the updates
    const updates = { ...args };
    console.log(updates);

    // remove the ID from the updates
    delete updates.id;

    // run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async deleteItem(parent, args, ctx, info) {
    // throw new Error("You are not allowed!");
    const where = { id: args.id };

    //1. find the item
    const item = await ctx.db.query.item({ where }, `{ id, title, user{id}}`);

    //2. check if they own that item, or have the permissions
    const ownsItem = item.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some((permission) =>
      ["ADMIN", "ITEMDELETE"].includes(permission)
    );

    if (!ownsItem && !hasPermissions) {
      throw new Error("You do not have a permission  to do that!");
    }

    //3. delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    //lowercasing their email for easier verification
    args.email = args.email.toLowerCase();

    //hash their password
    const password = await bcrypt.hash(args.password, 10);

    //create user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] },
        },
      },
      info
    );

    //create a jwt token for user
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    //set jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    //return user to the browser
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    //1. check user with the inputted email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    //2. check their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password!");
    }

    //3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    //set jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    //4. Return the user
    return user;
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "GoodBye!" };
  },

  async requestReset(parent, args, ctx, info) {
    //1. check is real user
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }

    //2. set a reset token and expiry on that  user
    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await promisify(randomBytes)(20)).toString("hex");

    const resetTokenExpiry = Date.now() + 3600000;

    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });
    // console.log(res);

    //3. Email them thae reset token
    const mailRes = await transport.sendMail({
      from: "sample@example.com",
      to: user.email,
      subject: "Password Request",
      html: makeANiceEmail(`Your request token is here! \n\n
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}"> Click Here to Reset Your Password </a>
    `),
    });

    return { message: "Thanks" };
  },

  async resetPassword(parent, args, ctx, info) {
    //1. check is passwords match
    if (args.password != args.confirmPassword) {
      throw new Error("Your passwords do not match!");
    }

    //2. check if legit token

    //3. check if its expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000,
      },
    });
    if (!user) {
      throw new Error(`This token is either invalid or expired!`);
    }

    //4. has their new password
    const password = await bcrypt.hash(args.password, 10);

    //5. Save the new password to the user's database and remove old resetToken fields.
    const updatedUser = await ctx.db.mutation.updateUser({
      where: {
        email: user.email,
      },
      data: { password, resetToken: null, resetTokenExpiry: null },
    });

    //6. Generate JWT
    const token = jwt.sign(
      { userId: updatedUser.userId },
      process.env.APP_SECRET
    );

    //7. set JWT cookie
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    //8. return the new user
    return updatedUser;
  },

  async updatePermissions(parent, args, ctx, info) {
    // 1.  check if loggedin
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }

    // 2.  query  the current user
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      info
    );

    // 3.  check  if they have permissions to do this
    hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);

    // 4. update the  permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions,
          },
        },
        where: {
          id: args.userId,
        },
      },
      info
    );
  },

  async addToCart(parent, args, ctx, info) {
    //1. check if loggedin
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in first!");
    }

    //2. query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        item: { id: args.id },
      },
    });

    //3. check if the item is already in their cart and increment by 1 if it is
    if (existingCartItem) {
      console.log("This item is already in their cart.");
      return ctx.db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 },
        },
        info
      );
    }

    //4. if its not, create a fresh cartItem for the user
    return ctx.db.mutation.createCartItem(
      {
        data: {
          user: {
            connect: { id: userId },
          },
          item: {
            connect: { id: args.id },
          },
        },
      },
      info
    );
  },

  async removeFromCart(parent, args, ctx, info) {
    // find the cart item
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id,
        },
      },
      `{id, user{id}}`
    );

    //make user we found an item
    if (!cartItem) throw new Error("No CartItem Found!");

    //make user they own that cart
    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error("Error!");
    }

    // delete that cart item
    return ctx.db.mutation.deleteCartItem(
      {
        where: { id: args.id },
      },
      info
    );
  },

  async createOrder(parent, args, ctx, info) {
    // 1. query current and make sure they are logged in
    const { userId } = ctx.request;
    if (!userId) throw new Error("Must be logged in to complete order!");
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `
    {
      id
      name
      email
      cart{
        id
        quantity
        item{title price id description image largeImage}
      }
    }`
    );

    // // 2. recalculate the total the price
    const amount = user.cart.reduce(
      (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
      0
    );
    console.log("amount: ", amount);

    // 3. create stripe charge
    const charge = await stripe.charges.create({
      amount,
      currency: "USD",
      source: args.token,
    });

    //4. convert the cartItems to  orderitem
    const orderItems = user.cart.map((cartItem) => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      };
      delete orderItem.id;
      return orderItem;
    });

    //5. create the order
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } },
      },
    });

    //6. clean up (clear the users  cart, delete cartItems)
    const cartItemIds = user.cart.map((cartItem) => cartItem.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: {
        id_in: cartItemIds,
      },
    });

    //7. return the order to  the client
    return order;
  },

  updateUser(parent, args, ctx, info) {
    // copy of the updates
    const updates = { ...args };
    console.log(updates);

    // remove the ID from the updates
    delete updates.id;

    // run the update method
    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: updates.id,
        },
      },
      info
    );
  },

  // async updateUser(parent, args, ctx, info) {
  //   // copy of the updates
  //   const updates = { ...args };

  //   // remove the ID from the updates
  //   delete updates.id;

  //   // run the update method
  //   return ctx.db.mutation.updateUser(
  //     {
  //       data: updates,
  //       where: {
  //         id: args.id,
  //       },
  //     },
  //     info
  //   );
  // },
};

module.exports = Mutations;
