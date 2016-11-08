const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql') // Load the graphql type definitions and scalar types used in building the person type

// Load the types that are referenced by the person type
const SkillType = require("./skill.js")
const CountryType = require("./country.js")

// Load the date format enum. Used in the dateOfBirth fields format argument
const dateFormatEnum = require("../enums/dateFormatEnum.js")

// Create the Person Type
module.exports = PersonType = new GraphQLObjectType({
  name: "Person",
  description: "A person object",
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: 'The persons id'  
        // Note that there is no resolve function for this field.
        // If the field is named the same as the field in the data no resolve function is required. 
    },
    firstName: {
      type: GraphQLString,
      description: 'The persons first name',
    },
    lastName: {
      type: GraphQLString,
      description: 'The persons last name',
    },

    // Note that the fullname field does not exist in the person database table (personDB.js). 
    // This is a calulated field using the firstName and lastName fields
    fullName: {
      type: GraphQLString,
      description: 'The persons full name',

      // Use the resolve function to concatenate the firstName and lastName fields
      resolve: (person) => `${person.firstName} ${person.lastName}`
    },
    gender: {
      type: GraphQLString,
      description: 'The persons gender',

      // The resolve function is used to change the one character gender field to the full word (Male or Female) 
      resolve: (person) => (person.gender === 'm') ? "Male" : "Female"
    },
    dateOfBirth: {
      type: GraphQLString,
      description: 'The date the person was born',

      // This field can receive an argument (parameter) called format.
      // The value of the argument is limited to the dateFormatEnum type.
      // Possible values are: UTC, ISO, Locale or DateString
      args: {
        format: { type: dateFormatEnum }
      },

      // The resolve function picks up the format argument using the second function parameter
      // To get the args value you can either: 
      //  - destructure the args object (as seen below)
      //  - select directly from the args object (as seen in the friends resolve function below)  
      resolve: function(person, {format}) {
        
        let date = new Date(person.dateOfBirth)

        // Note that the string passed to the format argument is the value field from the dateFormatEnum 
        switch(format) {
          case "ISOString":
            date = date.toISOString()
            break
          case "DateString":
            date = date.toDateString()  
            break
          case "LocaleString":
            date = date.toLocaleDateString()
            break
          default:  // Default case returns the UTC value as a string
            date = date.valueOf()
        } 

        return date
      }
    },
    friends: {
      type: new GraphQLList(PersonType),  // The friends field returns a list of PersonType objects
      description: "The persons friends",

      // This field can receive an argument (parameter) called top.
      // The value of the argument is an integer.
      args: {
        top: { type: GraphQLInt }
      },

      // Note that the resolve function uses the database connection that was passed through the conext object.
      // The top argument is used to limit the number of friends that get returned. 
      // If the top argument is not used then no limit is put on the number of friends that get returned.
      resolve: (person, args, context) => context.db.person.chain().find({ id: { '$in' : person.friends } }).limit(args.top).data()  
    },
    skills: {
      type: new GraphQLList(SkillType),  // The skills field returns a list of SkillType objects
      description: "A list of the persons skills",

      // Note that even though this field doesn't receive any arguments the arg parameter is included so we can access the context parameter.
      resolve: (person, args, context) => context.db.skills.find({ id: { '$in' : person.skills } })
    },
    country: {
      type: CountryType,  // The country field returns a CountryType object
      description: "The country the person lives in",

      // As above, this field doesn't receive any arguments but needs access to the context parameter. 
      // This time I've used an underscore to denote that no arguments are expected.
      resolve: (person, _, context) => context.db.country.by("id", person.country )
    },
  })
})