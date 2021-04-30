import { gql } from '@apollo/client'

export const PRODUCTS_QUERY = gql`query {
    products(sort: TIMESTAMP_DESC) {
      price
      name
      timestamp
      category
      _id
      thumpnail
      size {
        stock
        size_number
        _id
      }
    }
  }`

  export const PRODUCTS_QUERY_HOME = gql`query {
    products(sort: TIMESTAMP_DESC, limit: 3) {
      price
      name
      timestamp
      category
      _id
      thumpnail
    }
  }`

  export const PRODUCT_QUERY = gql`query($id: MongoID!) {
    productByID(_id: $id) {
      _id
      name
      type
      price
      category
      timestamp
      size {
        stock
        size_number
        _id
      }
      description
      imageList
      thumpnail
    }
  }`
  export const PRODUCT_FILTER_QUERY = gql`query ($name: String!){
    product(filter:{name:$name}){
      _id
      name
      type
      price
      category
      timestamp
      size {
        stock
        size_number
      }
      description
      imageList
      thumpnail
    }
  }
  `