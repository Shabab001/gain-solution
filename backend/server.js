const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./Schema/typeDefs");
const resolvers = require("./Schema/resolvers");
const { connection } = require("./Database/util");
connection();
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;
// const resolvers = {
//   Query: {
//     hello: () => {
//       return "Hello";
//     },
//   },
// };

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: { credentials: true, origin: true },
  });
  app.use((req, res) => {
    res.send("hello from express apollo server");
  });

  app.listen(4000, () => {
    console.log("server is running on 40000");
  });
}
startServer();
