// Load the graphql enum type used in building the date format enum
let { GraphQLEnumType } = require('graphql') 

// Create Enum type 
module.exports = dateFormatEnum = new GraphQLEnumType ({
  name: "DateFormat",
  description: "The date formats available",
  values: {
    "UTC": {          // The value you see in graphiql when selecting the date of birth format
      value: 'UTC',   // The value you see when processing the graphql query (see: line 73 of person.js) 
      description: "UTC Format"
    },
    "ISO": {
      value: 'ISOString',
      description: "ISO Format"
    },
    "Locale": {
      value: 'LocaleString',
      description: "Locale Format"
    },
    "DateString": {
      value: 'DateString',
      description: "DateString Format"
    }
  }
})