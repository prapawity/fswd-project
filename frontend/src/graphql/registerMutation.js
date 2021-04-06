import { gql } from '@apollo/client'

export const CREATE_CUSTOMER_USER = gql`
mutation ($record: CreateOneCustomerInput!) {
    createCustomer(record: $record) {
        recordId
      }
  }
`