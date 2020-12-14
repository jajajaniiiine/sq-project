import React from "react";
import { Query } from "react-apollo";
import { formatDistance } from "date-fns";
import Link from "next/link";
import styled from "styled-components";
import gql from "graphql-tag";
import Error from "./ErrorMessage";
import formatMoney from "../lib/formatMoney";
import OrderItemStyles from "./styles/OrderItemStyles";
import Head from "next/head";

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const OrderUI = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));

    .buttonList {
    display: grid;
    width: 100%;
    border: 2px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1.5rem;
      padding: 1rem;
    }
`;

class OrderList extends React.Component {
  render() {
    return (
      <div>
        <Query query={USER_ORDERS_QUERY} variables={{ id: this.props.id }}>
          {({ data: { orders }, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <Error error={error} />;
            if (orders.length == 0)
              return (
                <p>
                  No orders made yet, click the Shop Tab and start adding items
                  into your cart and checkout!
                </p>
              );
            // return <p>{data.orders.length}</p>;
            console.log("DATA: ", orders);
            return (
              <OrderUI>
                {orders.map((order) => (
                  <OrderItemStyles key={order.id}>
                    <Link
                      href={{ pathname: "/order", query: { id: order.id } }}
                    >
                      <a>
                        <div className="order-meta">
                          {order.items.map((item) => (
                            <p key={item.id}> {item.title}</p>
                          ))}
                        </div>
                        <div className="order-meta">
                          <p>
                            {order.items.reduce((a, b) => a + b.quantity, 0)}{" "}
                            Items
                          </p>
                          <p>
                            {order.items.length} Product
                            {order.items.length >= 1 ? "" : "s"}
                          </p>
                          {/* <p>{formatDistance(order.createdAt, new Date())}</p> */}
                          <p>{formatMoney(order.total)}</p>
                        </div>
                        <div className="images">
                          {order.items.map((item) => (
                            <img
                              key={item.id}
                              src={item.image}
                              alt={item.title}
                            />
                          ))}
                        </div>
                      </a>
                    </Link>
                    <div className="buttonList">
                      <button
                        type="submit"
                        onClick={() => {
              if (confirm("Confirming Order? ")) {
                deleteItem().catch((err) => {
                  alert(err.message);
                });
              }
            }}
                      >
                        Confirm Order
                      </button>
                    </div>
                  </OrderItemStyles>
                ))}
              </OrderUI>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default OrderList;
