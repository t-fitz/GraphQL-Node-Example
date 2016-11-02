const loki = require("lokijs");
const db = new loki('loki.json');

// Create Person collection (table) 
module.exports = Skills = db.addCollection('skills', { unique: ['id'] });

// Add entries to Skills collection
Skills.insert({ "id": 1, "description": "JavaScript" });
Skills.insert({ "id": 2, "description": "HTML" });
Skills.insert({ "id": 3, "description": "CSS" });
Skills.insert({ "id": 4, "description": "Node JS" });
Skills.insert({ "id": 5, "description": "SQL" });
Skills.insert({ "id": 6, "description": "Loki JS" });
Skills.insert({ "id": 7, "description": "Git" });
Skills.insert({ "id": 8, "description": "jQuery" });
Skills.insert({ "id": 9, "description": "C#" });