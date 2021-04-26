import { gql } from '@apollo/client'

export const CREATE_PRODUCT = gql`
mutation ($record: CreateOnePRODUCTInput!) {
    createProduct(record: $record) {
        recordId
      }
  }
`

export const DELETE_PRODUCT = gql`
mutation ($id: MongoID!){
  deleteProduct(filter: {
  _id: $id}){
    recordId
  }
}
`

export const UPDATE_PRODUCT = gql`
mutation ($id: MongoID!, $record: UpdateOnePRODUCTInput!){
  updateProduct(filter:{
    _id: $id
  }record: $record) {
    recordId
  }
}`