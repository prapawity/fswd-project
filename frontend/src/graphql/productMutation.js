import { gql } from '@apollo/client'

export const CREATE_PRODUCT = gql`
mutation ($record: CreateOnePRODUCTInput!) {
    createProduct(record: $record) {
        recordId
      }
  }
`