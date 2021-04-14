import { gql } from '@apollo/client'

export const PRODUCTS_QUERTY = gql`query {
    products {
      name
      timestamp
      category
      _id
    }
  }`

  export const PRODUCT_QUERTY = gql`query($id: MongoID!) {
    productByID(_id: $id) {
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