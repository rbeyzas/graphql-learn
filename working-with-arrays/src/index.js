const { GraphQLServer } = require("graphql-yoga");

//Scaler Types: String, Boolean, Int, Float, ID

// Challenge
// Create an "add" query that returns a float
// Set up "add" to take in two arguments (a,b), which are both required floats
// Set up the resolver send back the sum of two arguments

// Demo user data
const users = [
  {
    id: "1",
    name: "Beyza",
    email: "rukiyebeyzasarikaya@gmail.com",
    age: 25,
  },
  {
    id: "2",
    name: "XXX",
    email: "xxx@gmail.com",
    age: 28,
  },
  {
    id: "3",
    name: "Example",
    email: "example@gmail.com",
    age: 30,
  },
];

//Challenge 2

// Set up an array of three posts with dummy post data (id, title, body, published)
// Set up a "posts" query and resolver that returns all posts
// Test the query out
// Add a "query" argument that only returns posts that contain the query string in the title or body
// Run a few sample queries searching for posts with a specific title

// Demo post data
const posts = [
  {
    id: "1",
    title: "My first blog post",
    body: "This is the body of my first blog post",
    published: false,
  },
  {
    id: "2",
    title: "My second blog post",
    body: "This is the body of my second blog post",
    published: true,
  },
  {
    id: "3",
    title: "My third blog post",
    body: "This is the body of my third blog post",
    published: true,
  },
];

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    greeting(name: String, position: String): String!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
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

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter((post) => {
        const isTitleMatch = post.title
          .toLowerCase()
          .includes(args.query.toLowerCase());
        const isBodyMatch = post.body
          .toLowerCase()
          .includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      });
    },

    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favorite ${args.position}.`;
      } else {
        return "Hello";
      }
    },
    // array reduce method
    add(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }
      //
      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    grades(parent, args, ctx, info) {
      return [99, 80, 93];
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
