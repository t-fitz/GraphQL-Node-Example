var loki = require("lokijs");
var db = new loki('loki.json');

// Create Person collection (table) 
module.exports = Person = db.addCollection('person', { unique: ['id'] });

// Add entries to Person collection
Person.insert({
    "id": 1,
    "firstName": "Joe",
    "lastName": "Bloggs",
    "gender": "m",
    "dateOfBirth": 247190400000,    // stored as UTC date string
    "friends": [2,4,6],
    "skills": [1,5,8],
    "country": "gb"    
});

Person.insert({
    "id": 2,
    "firstName": "Fred",
    "lastName": "Smith",
    "gender": "m",
    "dateOfBirth": 382147200000,
    "friends": [1,5,6],
    "skills": [2,3,5,8,9],
    "country": "us"    
});

Person.insert({
    "id": 3,
    "firstName": "Jane",
    "lastName": "Brown",
    "gender": "f",
    "dateOfBirth": 487382400000,
    "friends": [2,3,5],
    "skills": [4,6,7,8],
    "country": "gb"    
});

Person.insert({
    "id": 4,
    "firstName": "James",
    "lastName": "Jackson",
    "gender": "m",
    "dateOfBirth": -187315200000,
    "friends": [2],
    "skills": [2,9],
    "country": "fr"    
});

Person.insert({
    "id": 5,
    "firstName": "Helen",
    "lastName": "Jones",
    "gender": "f",
    "dateOfBirth": 798163200000,
    "friends": [1,2,3,4],
    "skills": [2,4,5,7,9],
    "country": "es"    
});

Person.insert({
    "id": 6,
    "firstName": "Megan",
    "lastName": "Black",
    "gender": "f",
    "dateOfBirth": 47088000000,
    "friends": [2,5],
    "skills": [1,4,7,8],
    "country": "gb"    
});