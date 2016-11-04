const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql') // Load the graphql scalar types used in building the skill type

// Create the Skill Type
module.exports = SkillType = new GraphQLObjectType({
  name: "Skill",
  description: "A skill",
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'The skill id'
    },
    description: {
      type: GraphQLString,
      description: 'The skill description'
    }
  })
})