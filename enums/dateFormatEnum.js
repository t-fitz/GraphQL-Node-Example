// Load the graphql scalar types used in building the date format enum
let { GraphQLEnumType } = require('graphql') 

// Create Enum type 
module.exports = dateFormatEnum = new GraphQLEnumType ({
  name: "DateFormat",
  description: "The date formats available",
  values: {
    "UTC": {
      value: 'UTC',
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