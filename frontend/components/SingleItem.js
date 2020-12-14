import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Error from "./ErrorMessage";
import styled from "styled-components";
import Head from "next/head";
import formatMoney from "../lib/formatMoney";
import AddToCart from "./AddToCart";
import Link from "next/link";
import SickButton from "./styles/SickButton";

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${(props) => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }

  .buttonList {
    display: grid;
    width: 100%;
    border: 2px solid ${(props) => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${(props) => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-size: 1.5rem;
      padding: 1rem;
    }
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
      price
    }
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.item) return <p>No Item Found for {this.props.id}</p>;
          const item = data.item;
          console.log(item);
          return (
            <SingleItemStyles>
              <Head>
                <title>Sick Fits | {item.title} </title>
              </Head>
              <div className="details">
                <Link
                  href={{
                    pathname: "items",
                  }}
                >
                  <SickButton>Back</SickButton>
                </Link>
                <p>Name: {item.title}</p>
                <p>Description: {item.description}</p>
                <p>Price: {formatMoney(item.price)}</p>
                <div className="buttonList">
                  <AddToCart id={item.id} />
                </div>
              </div>
              <img src={item.largeImage} alt={item.title} />
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
