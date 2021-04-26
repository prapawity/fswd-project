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
      _id
      products {
        name
        price
        description
        _id
        thumpnail
        type
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
      _id
      products {
        name
        _id
        thumpnail
        type
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
      _id
      products {
        name
        _id
        thumpnail
      }
    }
  }
`;


export const REMOVE_ORDER = gql`mutation ($id: MongoID!){
  removeOrder(filter: {
    _id: $id
  }) {
  recordId
  }
}`