var express     = require('express')
var graphqlHTTP = require('express-graphql')
var querySchema = require("./query.js") // Load the schema for our root level query

const db = require("./database.js") // Get our database connection 

var app = express()

// Setup the graphql url route
app.use('/graphql', graphqlHTTP({
  schema: querySchema,  // Link the root level query schema to the express-graphql schema option
  context: { db },      // Pass the database connection to the queries context object. By default the HTTP request is passed to the context object.  
  graphiql: true        // Enable the GraphiQL IDE
}))

app.listen(4000)
console.log('Running a GraphQL API server')
console.log('Visit localhost:4000/graphql to play with GraphiQL')

// start server with: node server.js