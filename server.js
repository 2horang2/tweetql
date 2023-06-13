
import { ApolloServer, gql } from "apollo-server";

//const { ApolloServer, gql } = require("apollo-server");
//gql은 미리 data type을 알고 있어야 된다
//Define your GraphQL schema (GraphQL 스키마 정의)
//모든 GraphQL 서버(Apollo Server 포함)는 스키마를 사용하여 클라이언트가 쿼리할 수 있는 데이터 구조를 정의합니다.
//(스키마는 type definitions의 모음입니다.)
const typeDefs = gql`
    type User {
        id: ID
        username: String
    }
    type Tweet{
        id: ID
        text: String
        author : User
    }
  type Query {
    allTweets : [Tweet]
    tweet(id: ID): Tweet
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});