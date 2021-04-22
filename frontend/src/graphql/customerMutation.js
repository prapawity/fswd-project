import { gql } from "@apollo/client";

export const UPDATE_CUSTOMER = gql`
  mutation(
    $id: MongoID!
    $email: String!
    $tel: String!
    $address: String!
    $img: String!
  ) {
    updateCustomer(
      filter: { _id: $id }
      record: {
          email: $email
          tel: $tel
          address: $address
          img: $img
      }
    ) {
      record {
        email
        tel
        address
        img
      }
    }
  }
`;
