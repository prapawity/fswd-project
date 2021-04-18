import { gql } from "@apollo/client";

export const ORDER_QUERY = gql`
  query($id: MongoID!) {
    orderById(_id: $id) {
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
      promotionID
      promotion {
        discount
        name
      }
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
`;

export const ORDERS_QUERY = gql`
  query {
    orders {
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
      promotionID
      promotion {
        discount
        name
      }
      _id
      products {
        name
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
`;

export const ORDER_QUERY_BY_USERID = gql`
  query($id: String!) {
    orders(filter:{
        userID: $id
      }) {
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
      promotionID
      promotion {
        discount
      }
      _id
      products {
        name
        _id
        thumpnail
      }
    }
  }
`;