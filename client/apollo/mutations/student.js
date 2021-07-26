import { gql } from "@apollo/client";

export const CREATE_STUDENT = gql`
  mutation CreateStudentMutation($data: createStudentInputs!) {
    createStudent(input: $data) {
      id
      name
      email
      phone
      dob
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation UpdateStudentMutation(
    $id: ID!
    $Subjects: [ID!]
    $Inputs: updateStudentInputs
  ) {
    updateStudent(id: $id, subject: $Subjects, input: $Inputs) {
      id
      email
      phone
      dob
      name
      subject {
        id
        name
      }
    }
  }
`;

export const DELETE_STUDENT = gql`
  mutation DeleteStudentMutation($id: ID!) {
    deleteStudent(id: $id) {
      id
      name
      email
      dob
      phone
    }
  }
`;
