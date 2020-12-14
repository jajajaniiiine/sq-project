import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import SignOut from "./SignOut";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart";
import CartCount from "./CartCount";

const Nav = () => (
  <User>
    {({ data: { me } }) =>
      console.log(me) || (
        <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>

          {me && (
            <>
              {me.permissions.map((per) =>
                per === "ADMIN" ? (
                  <Link href="/sell">
                    <a>Sell</a>
                  </Link>
                ) : null
              )}
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              {console.log(me.permissions)}
              {me.permissions.map((per) =>
                per === "ADMIN" ? (
                  <Link href="permissions">
                    <a>Permissions</a>
                  </Link>
                ) : null
              )}
              {me.permissions.map((per) =>
                per === "ADMIN" ? (
                  <Link href="payments">
                    <a>Payments</a>
                  </Link>
                ) : null
              )}
              <Link
                href={{
                  pathname: "/me",
                  query: { id: me.id },
                }}
              >
                <a>Account</a>
              </Link>
              <SignOut />
              <Mutation mutation={TOGGLE_CART_MUTATION}>
                {(toggleCart) => (
                  <button onClick={toggleCart}>
                    My Cart
                    <CartCount
                      count={me.cart.reduce(
                        (tally, cartItem) => tally + cartItem.quantity,
                        0
                      )}
                    />
                  </button>
                )}
              </Mutation>
            </>
          )}

          {/* {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <SignOut />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {(toggleCart) => (
                <button onClick={toggleCart}>
                  My Cart
                  <CartCount
                    count={me.cart.reduce(
                      (tally, cartItem) => tally + cartItem.quantity,
                      0
                    )}
                  />
                </button>
              )}
            </Mutation>
          </>
        )} */}

          {!me && (
            <Link href="/signup">
              <a>Sign In</a>
            </Link>
          )}
        </NavStyles>
      )
    }
  </User>
);

export default Nav;
