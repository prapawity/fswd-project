import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query($id: MongoID!) {
    customerById(_id: $id) {
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
