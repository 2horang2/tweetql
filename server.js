
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
    type Mutation{
        postTweet(text: String, userId: ID): Tweet
        deleteTweet(id: ID): Boolean
    }
`;

//GraphQL에 대한 대부분은 데이터 fetching이지만, 
//서버 측 데이터를 수정할 수 있는 방법이 필요합니다.
//서버 측 데이터를 수정하는 모든 작업은 mutation을 통해 보내야 한다는 
//규칙을 설정하는 것이 유용합니다.


const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});