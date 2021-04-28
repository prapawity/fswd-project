import { gql } from "@apollo/client"

export const UPDATE_ORDER = gql`
mutation($id: MongoID!, $status: EnumOrderStatus) {
  updateOrder(filter:{
    _id: $id
  }
  record: {
    status: $status
  }) {
    recordId
  }
}`

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
