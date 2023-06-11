const { GraphQLServer } = require("graphql-yoga");

//Scaler Types: String, Boolean, Int, Float, ID

// Create query definitions and resolvers for the following:
// title - string product name
// price - number as float
// releaseYear - number as int (optional)
// rating - number as float (optional)
// inStock - boolean

// Type Definitions
const typeDefs = `
  type Query {
    id: ID!
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
      return "abc123";
    },
    title() {
      return "The War of Art";
    },
    price() {
      return "12.99";
    },
    releaseYear() {
      return 2001;
    },
    rating() {
      return 5;
    },
    inStock() {
      return true;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is now up and running at http://localhost:4000");
});
