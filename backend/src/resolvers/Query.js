const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    //check for current UserID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },

  async users(parent, args, ctx, info) {
    //1. check  is a user is logged  in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }

    // 2. check if  user has the  permission  to query  all  users.
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

    //3. if they do, query  all the users
    return ctx.db.query.users({}, info);
  },

  async order(parent, args, ctx, info) {
    //1. Make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error("Must be logged in!");
    }

    //2. Query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id },
      },
      info
    );

    //3. Check if they have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      "ADMIN"
    );
    if (!ownsOrder || !hasPermission) {
      throw new Error("You cannot see this part!");
    }

    //4. Return the order
    return order;
  },

  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be logged in!");
    }
    return ctx.db.query.orders(
      {
        where: {
          user: { id: userId },
        },
      },
      info
    );
  },

  user(parent, args, ctx, info) {
    //check for current UserID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
};

module.exports = Query;
