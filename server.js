var express     = require('express');
var graphqlHTTP = require('express-graphql');
var querySchema = require("./query.js");      // load the schema for our root level query

// Our Database connection 
const db = require("./database.js")

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: querySchema,  // Link the query schema to the graphqlHTTP schema parameter
  context: { db },      // Pass the database connection as the queries context. By default the HTTP request object is passed as the context.  
  graphiql: true        // Enable the GraphiQL UI
}));

app.listen(4000);
console.log('Running a GraphQL API server');
console.log('Visit localhost:4000/graphql to play with GraphiQL');
// start server with: node server.js