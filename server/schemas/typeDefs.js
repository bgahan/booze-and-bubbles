const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    cocktails: [Cocktail]
  }

  type Cocktail {
    _id: ID
    idDrink: String
    strDrink: String
    strInstructions: String
    strDrinkThumb: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input savedCocktail {
    _id: ID
    idDrink: String
    strDrink: String
    strInstructions: String
    strDrinkThumb: String
    createdAt: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    cocktails(username: String): [Cocktail]
    cocktail(_id: ID!): Cocktail
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addCocktail(input: savedCocktail): User
  }

  `;

module.exports = typeDefs;