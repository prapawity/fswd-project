import { gql } from '@apollo/client'

export const PRODUCTS_QUERTY = gql`query {
    products(sort: TIMESTAMP_DESC) {
      price
      name
      timestamp
      category
      _id
      thumpnail
    }
  }`

  export const PRODUCTS_QUERTY_HOME = gql`query {
    products(sort: TIMESTAMP_DESC, limit: 3) {
      price
      name
      timestamp
      category
      _id
      thumpnail
    }
  }`

  export const PRODUCT_QUERTY = gql`query($id: MongoID!) {
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
      }
      description
      imageList
      thumpnail
    }
  }`