# GraphQL-Node-Example
<br/>

## What am I looking at?

It's a [GraphQL](http://graphql.org/) project using [node](https://nodejs.org) and [express](http://expressjs.com/) which can be quickly setup so you can have a play around with GraphQL. Obvs!! :grin:

<br/>

## Getting Started

1. **Install node.js**
  
    As this project is based on node we'll definietly need to have this installed.

    Head to [https://nodejs.org/](https://nodejs.org/) and download the latest version for your computer.

2. **Get the code for this project**

    Find the green 'Clone or download' and download the zipped project.

    Extract the files from inside the GraphQL-Node-Example-master folder into a folder of your choice.

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

    Navigate to ```localhost:4000/graphql``` in your browser to start writing GraphQL queries with [GraphiQL](https://github.com/graphql/graphiql). See the **Example Queries** section for examples of what can be done. 

    Look through the code to see what's going on.

<br/>

## The basic structure of a GraphQL project

**NB:** Documentation is still a work in progress. More words coming soon!!

<br/>

## Example Queries

Below are two basic queries to get you started.

**Example person query**

Query
```
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
```

Variables
```
{
  "id": 1
}
```
<br/>

**Example people query**

Query
```
query getPersons ( $lastname : String){
  people (lastName: $lastname) {
    fullName
	}
}
```

Variables
```
{
  "lastname": "ack"
}
```