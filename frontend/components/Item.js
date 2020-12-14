import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import Pricetag from "./styles/PriceTag";
import Link from "next/link";
import formatMoney from "../lib/formatMoney";
import DeleteItem from "./DeleteItem";
import AddToCart from "./AddToCart";

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <Query query={CURRENT_USER_QUERY} variables={this.props.data}>
        {({ data }, loading) => {
          // console.log(data.me)
          if (loading) return <p>Loading...</p>;
          return (
            <ItemStyles>
              {item.image && <img src={item.image} alt={item.title} />}

              {/* {item.image ? <img /> : null} */}
              <Title>
                <Link
                  href={{
                    pathname: "/item",
                    query: { id: item.id },
                  }}
                >
                  <a> {item.title} </a>
                </Link>
              </Title>
              {/* <Pricetag>{item.price}</Pricetag> */}
              <Pricetag>{formatMoney(item.price)}</Pricetag>
              <p>{item.description}</p>

              {data.me && (
                <div className="buttonList">
                  {data.me.permissions.map((per) =>
                    per === "ADMIN" ? (
                      <Link
                        href={{
                          pathname: "/update",
                          query: { id: item.id },
                        }}
                      >
                        <a>Edit</a>
                      </Link>
                    ) : null
                  )}

                  <AddToCart id={item.id} />

                  {data.me.permissions.map((per) =>
                    per === "ADMIN" ? (
                      <DeleteItem id={item.id}>Delete</DeleteItem>
                    ) : null
                  )}
                </div>
              )}
            </ItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default Item;
