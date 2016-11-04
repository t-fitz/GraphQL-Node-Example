const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} = require('graphql') // Load the graphql scalar types for use in building our query type

// Our Person Type schema
const PersonType = require("./schema/person.js")

// Define the root Query Type Schema. Called from server.js 
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    person: {
      type: PersonType,

      // args describes the arguments that the person query accepts
      args: { 
        id: { type: GraphQLInt }
      },
      // The resolve function has three parameters. See also: http://graphql.org/learn/execution/#root-fields-resolvers
      // 1- The parent object 
      //    - The previous object, which for a field on the root Query type is often not used as it is 'undefined'.
      //    - for the root query types this will be 'undefined' as this is the root 'parent' object.
      //    - for subsequent types this will be the resolved object from the type that called it.
      //      - eg. The 'person' query resolves to a Person type. The Person type will receive the result of the parent queries resolve function (see below).   
      // 2- The argument object (see above)
      //    - for the person query there is only one argument in the args object (id)
      // 3- The context object
      //    - for the root query type it receives it's context from the express-graphql module in server.js which, by default, is the HTTP request.
      //    - in this example the database connection is passed through.
      resolve: (parentObject, {id}, context) => context.db.person.by("id", id)
    },
    people: {
      type: new GraphQLList(PersonType),  // Returns a list (array) of Person types
      args: {
        lastName: { type: GraphQLString }
      },
      // As above this query doesn't receive any parent object but needs access to the subsequent parameters. 
      // This time I've used an underscore to denote that no parent object is expected.
      resolve: function (_, {lastName}, context) {

        // check that the lastName argument has been filled in.
        if (typeof lastName === "undefined") {
          return new Error("A 'lastName' variable is required");
        }
        else {
          return context.db.person.find({'lastName': {'$contains': lastName}});
        }
        
      }
    }
  }
})

// initialise the schema
module.exports = new GraphQLSchema({query: queryType})