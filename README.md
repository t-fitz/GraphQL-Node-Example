# GraphQL-Node-Example
<br/>

## What am I looking at?

It's a [GraphQL](http://graphql.org/) project running in node which can be quickly setup so you can have a play around with GraphQL. Obvs!! :grin:

To get this project working I'm using:
* [node js](https://nodejs.org) as the web server
* the [express-graphql](https://github.com/graphql/express-graphql) module to handle the graphql query and to show the graphiql IDE
* [graphql-js](https://github.com/graphql/graphql-js) to setup the graphql types
* [loki js](https://github.com/techfort/LokiJS) to store our database entries 

<br/>

----

## Getting started

1. **Install node.js**
  
    As this project is based on node we'll definietly need to have this installed.

    Head to [https://nodejs.org/](https://nodejs.org/) and download the latest version for your computer.

2. **Get the code**

    Find the green 'Clone or download' button and download the zipped project.

    Extract the files from inside the GraphQL-Node-Example-master folder into a folder of your choice.

    Open up your favourite cli and navigate to your project folder and type and execute:

    ```cmd
    npm install
    ```

    This will install all the node modules that are needed to run the project.

3. **Run the node server**

    In your command line now type and execute.

    ```cmd
    node server.js
    ```

    This will start the node server using the server.js file.

4. **Profit**

    Navigate to ```localhost:4000/graphql``` in your browser to start writing GraphQL queries with [GraphiQL](https://github.com/graphql/graphiql). See the **Example Queries** section for examples of what can be done. 

    Look through the code to see what's going on.

<br/>

----

## What's going on in there?

Let's have a quick look at how this project works once you are up and running.

When you send a query through the graphiql IDE here's what happens behind the scenes.

1. The query is sent to the graphql url which was setup in the server.js file (line 10)
2. Express (via express-graphql) passes this query to the root query type (query.js) that is specified in the express-graphql ```schema``` option (line 11, server.js)
3. The root query type then resolves all the fields that were in the graphql query 

  So, for the example person query in the example queries section the root query type would resolve the following fields:

  * person (line 19, query.js) - resolves by getting the person by their id
    * id (line 22, person.js)
    * firstName (line 28, person.js)
    * lastName (line 32, person.js)
    * fullName (line 39, person.js)
    * gender (line 46, person.js)
    * dateOfBirth (line 53, person.js)
    * friends (line 89, person.js) - resolves by getting a list of persons by their ids. The values come from the parent objects friends array
      * fullName (line 39, person.js)
    * skills (line 98, person.js) - resolves by getting a list of skills by id. The values come from the parent objects skills array
      * description (line 16, skill.js)
    * country (line 104, person.js) - resolves by getting the country by its id
      * name (line 15, country.js)

  If the field resolves to another type (eg. when the country field resolve to the country type) then the data from the resolve function gets passed to that type (see line 109 of person.js).

4. Once all the fields are resolved the resulting data comes back to us within a data json object. 

  ```json 
  {
    "data": {
      "person": {
        "fullName": "Joe Bloggs"
      }
    }
  }
  ```

  If there are any errors then an errors array is returned.

  ```json
  {
    "errors": [
      {
        "message": "Argument \"id\" has invalid value a.\nExpected type \"Int\", found a.",
        "locations": [
          {
            "line": 2,
            "column": 14
          }
        ]
      }
    ]
  }
  ```

<br/>

----

## Example Queries

Below are two basic queries to get you started.

**Example person query**

```
{
  person (id: 1) {
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

<br/>

**Example people query**

```
{
  people (lastName: "ack") {
    fullName
  }
}
```
