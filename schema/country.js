const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql'); // Load the graphql scalar types used in building the country type

// Create the Skill Type
module.exports = CountryType = new GraphQLObjectType({
  name: "Country",
  description: "A country",
  fields: () => ({
    id: {
      type: GraphQLString,
      description: 'The country id'
    },
    name: {
      type: GraphQLString,
      description: 'The country name'
    }
  })
});