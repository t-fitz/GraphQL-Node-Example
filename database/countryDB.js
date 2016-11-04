var loki = require("lokijs")
var db = new loki('loki.json')

// Create Person collection (table) 
module.exports = Country = db.addCollection('country', { unique: ['id'] })

// Add entries to Country collection
Country.insert({ "id": "gb", "name": "United Kingdom" })
Country.insert({ "id": "us", "name": "United States of America" })
Country.insert({ "id": "fr", "name": "France" })
Country.insert({ "id": "de", "name": "Germany" })
Country.insert({ "id": "es", "name": "Spain" })
Country.insert({ "id": "nl", "name": "Netherlands" })