const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} = require('graphql') // Load the graphql type definitions and scalar types for use in building our query type

// Load the type that is referenced by the query type
const PersonType = require("./schema/person.js")

// Define the root Query Type Schema. Called from server.js 
const queryType = new GraphQLObjectType({
  name: 'Query',
  
  // The fields in the root query type will be the queries that you can call from the graphql api.
  // In this example you can call a person query and a people query
  fields: {
    person: {
      // The person query uses the Person type to build it's response
      type: PersonType,

      // The args object describes the arguments that the person query accepts
      args: { 
        id: { type: GraphQLInt }
      },

      // The resolve function has three parameters. See also: http://graphql.org/learn/execution/#root-fields-resolvers
      // 1- The parent object 
      //    - An object which was passed from the parent types resolve function.
      //      - for the root query types this will be 'undefined' as there has been no other 'parent' object.
      //      - for subsequent types this will be the resolved object from the type that called it.
      //        - eg. The 'person' query resolves to a Person type. The Person type will receive the result of the parent queries resolve function (see below).   
      // 2- The argument object (as described above)
      //    - for the person query there is only one argument in the args object, id.
      // 3- The context object
      //    - for the root query type it receives it's context from the express-graphql module in server.js which, by default, is the HTTP request.
      //    - in this example the database connection gets passed through.
      resolve: (parentObject, {id}, context) => context.db.person.by("id", id)
    },

    people: {
      // The people query also uses the Person type to build it's response but returns a list (array) of Person types.
      type: new GraphQLList(PersonType), 

      // The lastName arg is wrapped in the GraphQLNonNull type which enforces that the containing type is never null and throws an error if it is.
      // You could also check the value of the argument in the resolve function and then manually throw an error.
        // eg. return new Error("A 'lastName' variable is required");
      args: {
        lastName: { type: new GraphQLNonNull(GraphQLString) }
      },

      // Like the above field this query doesn't receive any parent object but needs access to the subsequent parameters. 
      // This time I've used an underscore to denote that no parent object is expected.
      resolve: function (_, {lastName}, context) {
        return context.db.person.find({'lastName': {'$contains': lastName}});
      }
    }
  }
})

// Initialise the root level schema
// A mutation can also be added to the GraphQLSchema definitions
  // See: http://graphql.org/graphql-js/type/#schema 
module.exports = new GraphQLSchema({query: queryType})