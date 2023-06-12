const { GraphQLServer } = require("graphql-yoga");

//Scaler Types: String, Boolean, Int, Float, ID

// Challenge Part 1
// Set up a "Comment" type with id and text fields. Both non-nullable
// Set up a "comments" array with 4 comments
// Set up a "comments" query with a resolver that returns all the comments
// Run an query to get all 4 comments with both id and text fields

// Challenge Part 2
// Goal: Set up a relationship between Comment and User
// Set up an author field on Comment
// Update the comments in the array to have a new author field (use on of the user ids) an value)
// Create a resolver for the Comments author field that returns the user who wrote the comment
// Run a sample query to gets all comments and gets the author name
// Set up a comments field on User
// Set up a resolver for User comments field that returns all comments belonging to that the user
// Run a sample query to gets all users and all there comments

// Challenge Part 3
// Goal: Set up a relationship between Comment and Post
// Set up a post field on Comment
// Update the comments in the array to have a new post field (use on of the post ids) an value)
// Create a resolver for the Comments post field that returns the post that the comment belongs to
// Run a sample query to gets all comments and gets the post name
// Set up a comments field on Post
// Set up a resolver for Post comments field that returns all comments belonging to that the post
// Run a sample query to gets all posts and all there comments

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

// Demo post data
const posts = [
  {
    id: "1",
    title: "My first blog post",
    body: "This is the body of my first blog post",
    published: false,
    author: "1",
    comments: "102",
  },
  {
    id: "2",
    title: "My second blog post",
    body: "This is the body of my second blog post",
    published: true,
    author: "2",
    comments: "103",
  },
  {
    id: "3",
    title: "My third blog post",
    body: "This is the body of my third blog post",
    published: true,
    author: "2",
    comments: "104",
  },
];

// Demo comment data
const comments = [
  {
    id: "102",
    text: "This is the first comment",
    author: "1",
    post: "1",
  },
  {
    id: "103",
    text: "This is the second comment",
    author: "1",
    post: "2",
  },
  {
    id: "104",
    text: "This is the third comment",
    author: "3",
    post: "3",
  },
  {
    id: "105",
    text: "This is the fourth comment",
    author: "2",
    post: "3",
  },
];

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
    
  }
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    comments(parents, args, ctx, info) {
      return comments;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comments.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.id.find((post) => {
        return post.id === parent.post;
      });
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
