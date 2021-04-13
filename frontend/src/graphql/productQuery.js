import { gql } from '@apollo/client'

export const PRODUCT_QUERTY = gql`query {
    products {
      name
      timestamp
      category
      _id
    }
  }`