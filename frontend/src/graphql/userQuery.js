import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query {
    customerById {
      username
      name_surname
      img
      email
      tel
      address
      _id
    }
  }
`;
