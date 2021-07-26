import { gql } from "@apollo/client";

export const CREATE_SUBJECT = gql`
  mutation ($data: createSubjectInputs!) {
    createSubject(input: $data) {
      name
      id
    }
  }
`;

export const UPDATE_SUBJECT = gql`
  mutation UpdateSubjectMutation($id: ID!, $data: updateSubjectInputs) {
    updateSubject(id: $id, input: $data) {
      id
      name
    }
  }
`;

export const DELETE_SUBJECT = gql`
  mutation DeleteSubjectMutation($id: ID!) {
    deleteSubject(id: $id) {
      id
      name
    }
  }
`;
