import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation(
    $record:CreateOneOrderInput!
  ) {
    createOrder(
      record: $record
    ) {
      recordId
      record {
        timestamp
        subtotal
        shippingFee
        total
        status
        address
        productsID {
          _id
          id
          size
        }
        userID
        _id
        products {
          name
          price
          description
          _id
          thumpnail
        }
        user {
          _id
          username
          name_surname
        }
      }
    }
  }
`;
