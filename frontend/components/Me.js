import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";
import SickButton from "./styles/SickButton";
import Router from "next/router";

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

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: ID, $name: String, $email: String) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

class Me extends Component {
  state = {};

  handleChange = (e) => {
    const { name, type, value } = e.target;
    console.log(name, type, value);
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateUser = async (e, updateUserMutation) => {
    e.preventDefault();
    console.log("Updating User!!");
    console.log("Update: ", this.state);

    const res = await updateUserMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
  };

  render() {
    return (
      <Query query={CURRENT_USER_QUERY} variables={this.props.data}>
        {({ data, loading }) => {
          console.log(data.me);
          if (loading) return <p>Loading...</p>;
          return (
            <Mutation mutation={UPDATE_USER_MUTATION} variables={this.state}>
              {(updateUser, { loading, error }) => (
                <div>
                  <h2>Account Page</h2>
                  <Form onSubmit={(e) => this.updateUser(e, updateUser)}>
                    <ErrorMessage error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                      {/* <input type="text" placeholder="Role" defaultValue={data.me.permissions.map(per => per === 'ADMIN' ? (<p></p>))}
                        disabled/> */}

                      {data.me.permissions.map((per) =>
                        per === "ADMIN" ? (
                          <div key={per.length}>
                            <label htmlFor="role">
                              Role
                              {/* {console.log(per)} */}
                              <input
                                type="text"
                                placeholder="Role"
                                defaultValue={per}
                                disabled
                              />
                            </label>
                          </div>
                        ) : // (<div key={per.length}>
                        //   {/* {console.log(per)} */}
                        //   <input type='text' placeholder='Role' defaultValue={data.me.permissions[0]} disabled />
                        // </div>)
                        null
                      )}
                      <label htmlFor="name">
                        Name
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Name"
                          defaultValue={data.me.name}
                          onChange={this.handleChange}
                        />
                      </label>
                      <label htmlFor="email">
                        Email
                        <input
                          type="email"
                          id="email"
                          placeholder="Email"
                          defaultValue={data.me.email}
                          onChange={this.handleChange}
                        />
                      </label>
                      <input type="submit" value="Save Changes" />
                      <button
                        // type="submit"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete your Account? "
                            )
                          ) {
                            deleteItem().catch((err) => {
                              alert(err.message);
                            });
                          }
                        }}
                      >
                        Delete Account
                      </button>
                    </fieldset>
                  </Form>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default Me;
export { UPDATE_USER_MUTATION, CURRENT_USER_QUERY };
