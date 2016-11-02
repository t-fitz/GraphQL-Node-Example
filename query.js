const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} = require('graphql'); // Load the graphql scalar types for use in building our query type

// Our Person Database connection 
const db = require("./database.js");

// Our Person Type schema
const PersonType = require("./schema/person.js");

// Define the root Query Type Schema
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    person: {
      type: PersonType,

      // args describes the arguments that the person query accepts
      args: { 
        id: { type: GraphQLInt }
      },
      resolve: function (_, {id}) {
        return db.person.by("id", id);
      }
    },
    people: {
      type: new GraphQLList(PersonType),
      args: {
        lastName: { type: GraphQLString }
      },
      resolve: function (_, {lastName}) {

        if (typeof lastName === "undefined") {
          return new Error("A 'lastName' variable is required");
        }
        else {
          return db.person.find({'lastName': {'$contains': lastName}});
        }
        
      }
    }
  }
});

// init the schema
module.exports = new GraphQLSchema({query: queryType});