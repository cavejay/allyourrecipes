const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const gadgetGraphQLType = require("./gadgetType");
const Mutations = require("./mutations");
const Gadget = require("../models/gadget");

// Shamelessly figuring out gql and mongoose from this walkthrough. Will fix later.
//https://medium.freecodecamp.org/how-to-setup-a-powerful-api-with-graphql-koa-and-mongodb-339cfae832a1

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    gadget: {
      type: gadgetGraphQLType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Gadget.findById(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
