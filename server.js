
import { ApolloServer, gql } from "apollo-server";


let tweets =[
    {
        id:"1",
        text:"hello",
        author: {
            id:"1",
            username: "jung"
        }
    },
    {
        id:"2",
        text:"hi",
    },
];

let users = [
  {
    id: "1",
    firstName: "nico",
    lastName: "las",
  },
  {
    id: "2",
    firstName: "Elon",
    lastName: "Mask",
  },
];

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        fullName: String!
    }
    type Tweet{
        id: ID!
        text: String!
        author : User
    }
    type Query {
        allTweets : [Tweet!]!
        allUsers : [User!]!
        tweet(id: ID!): Tweet
    }
    type Mutation{
        postTweet(text: String!, userId: ID!): Tweet
        deleteTweet(id: ID!): Boolean
    }
`;

const resolvers = {
    Query: {
      allTweets() {
        return tweets;
      },
      tweet(root, { id }) {
        return tweets.find((tweet) => tweet.id === id);
      },
      allUsers(){
        return users;
      },
    },
    Mutation: {
        postTweet(_, { text, userId }) {
          const newTweet = {
            id: tweets.length + 1,
            text,
          };
          tweets.push(newTweet);
          return newTweet;
        },
        deleteTweet(_, { id }) {
          const tweet = tweets.find((tweet) => tweet.id === id);
          if (!tweet) return false;
          tweets = tweets.filter((tweet) => tweet.id !== id);
          return true;
        },
      },
      User: {
        //fullName(root){
        fullName({firstName,lastName}){
   
          console.log(`${firstName}`);
          console.log(`${lastName}`);
          return `${firstName} ${lastName}`;
        }
      }
  }

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});