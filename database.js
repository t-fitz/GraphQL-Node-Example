// Load the different databse tables
const person = require("./database/personDB.js")
const skills = require("./database/skillsDB.js")
const country = require("./database/countryDB.js")

// Create a database object
module.exports = db = {
  person, 
  skills, 
  country 
}