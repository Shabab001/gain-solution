const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    getSubjects: [Subject!]
  }
  extend type Mutation {
    createSubject(input: createSubjectInputs!): Subject!
    deleteSubject(id: ID!): Subject!
    updateSubject(id: ID!, input: updateSubjectInputs): Subject!
  }
  input createSubjectInputs {
    name: String!
  }
  input updateSubjectInputs {
    name: String
  }
  type Subject {
    id: ID!
    name: String!
    student: [Student!]
  }
`;
