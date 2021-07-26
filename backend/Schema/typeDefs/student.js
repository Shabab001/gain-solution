const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    hello: String
    getStudents: [Student!]
  }
  extend type Mutation {
    createStudent(input: createStudentInputs!): Student!
    updateStudent(id: ID!, subject: [ID!], input: updateStudentInputs): Student!
    deleteStudent(id: ID!): Student!
  }
  type Student {
    id: ID!
    name: String!
    email: String!
    phone: String!
    dob: String!
    subject: [Subject!]
  }

  input createStudentInputs {
    name: String!
    email: String!
    phone: String!
    dob: String!
  }
  input updateStudentInputs {
    name: String
    email: String
    phone: String
    dob: String
  }
`;
