# GraphQL-Node-Example

## What am I looking at?

What we have here is a GraphQL project using node and express which can be quickly setup so you can have a play around with GraphQL.


## Getting Started

1. **Install node.js**
  
    As this project is based on node we'll definietly need to have this installed.

    Just head to [https://nodejs.org/](https://nodejs.org/) and download the latest version for your computer.

2. **Get the code for this project**

    Find the green 'Clone or download' and download the zipped project.

    Extract the files from inside the GraphQL-Node-Example-master folder into a folder of your choice (eg. .\graphql).

    Open up your favourite command-line interface and navigate to your project folder and type and execute.

    ```
    npm install
    ```

    This will install all the node modules that are needed to run the project.

3. **Run the node server**

    In your command line now type and execute.

    ```
    node server.js
    ```

    This will start the node server using the server.js file.

4. **Profit**

    Navigate to ```localhost:4000/graphql``` in your browser to start writing GraphQL queries with GraphiQL. See the **Example Queries** section for examples of what can be done. 

    Look through the code to see what's going on.


### The basic structure of a GraphQL project

**NB:** Documentation is still a work in progress. More words coming soon!!


## Example Queries

Below are two basic queries to get you started.

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