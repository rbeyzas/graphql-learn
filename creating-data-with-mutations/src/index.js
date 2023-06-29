import { GraphQLServer } from "graphql-yoga";
import { v4 as uuidv4 } from "uuid";

// some(): returns true if at least one element in the array satisfies the provided testing function

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

  type Mutation {
    createUser(name: String!, email:String!, age: Int!): User!
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => {
        return user.email === args.email;
      });

      if (emailTaken) {
        throw new Error("Email taken.");
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
      };

      users.push(user);

      return user;
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
