var express     = require('express');
var graphqlHTTP = require('express-graphql');
var querySchema = require("./query.js");      // load the schema for our root level query

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: querySchema,  // link the query schema to the graphqlHTTP schema parameter 
  graphiql: true        // enable the GraphiQL UI
}));

app.listen(4000);
console.log('Running a GraphQL API server');
console.log('Visit localhost:4000/graphql to play with GraphiQL');
// start server with: node server.js