const { GraphQLServer } = require("graphql-yoga");

//Scaler Types: String, Boolean, Int, Float, ID

//Create a Post type
// Add id, title, body, published to the type definition (all non-nullable)
// Define a "post" query that returns a single post
// Set up the resolver method to return some post data
// Test the query out!

//Other challenge
// Create an "add" query that returns a float
// Set up "add" to take in two arguments (a,b), which are both required floats
// Set up the resolver send back the sum of two arguments

// Type Definitions
const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
    add(a: Float!, b: Float!): Float!
    me: User!
    post: Post!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favorite ${args.position}.`;
      } else {
        return "Hello";
      }
    },
    add(parent, args, ctx, info) {
      return args.a + args.b;
    },
    me() {
      return {
        id: "123098",
        name: "Beyza",
        email: "rukiyebeyzasarikaya@gmail.com",
        age: 28,
      };
    },
    post() {
      return {
        id: "123098",
        title: "My first blog post",
        body: "This is the body of my first blog post",
        published: false,
      };
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("This server is up!");
});
