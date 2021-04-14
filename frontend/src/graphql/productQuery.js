import { gql } from '@apollo/client'

export const PRODUCTS_QUERTY = gql`query {
    products {
      price
      name
      timestamp
      category
      _id
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