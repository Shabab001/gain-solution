const { gql } = require("apollo-server-express");
const studentSchema = require("./student");
const subjectSchema = require("./subject");
const typeDefs = gql`
  scalar Date

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;
module.exports = [typeDefs, studentSchema, subjectSchema];
