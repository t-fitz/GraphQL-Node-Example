# Simple-GraphQL-Example
A GraphQL project using node

**NB:** This project is still a work in progress.

Expanded documentation to come. 

## Example Queries

**Example person query**
```
// query
query getPerson ( $id : Int){
  person (id: $id) {
    id
    firstName
    lastName
    fullName
    gender
    dateOfBirth (format: UTC)
    friends {
      fullName
    }
    skills {
      description
    }
    country {
      name
    }
  }
}

// variables
{
  "id": 1
}
```

**Example people query**
```
// query
query getPersons ( $lastname : String){
  people (lastName: $lastname) {
    fullName
	}
}

// variables
{
  "lastname": "ack"
}
```