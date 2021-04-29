import { gql } from '@apollo/client'

export const CREATE_PROMOTION = gql`
mutation ($record: CreateOnePROMOTIONInput!) {
    createPromotion(record: $record) {
        recordId
      }
  }
`
export const UPDATE_PROMOTION = gql`
mutation ($id:MongoID! $price:String $productID:String $name:String $discount:Float $limit:Float $status:Boolean ) 
{updatePromotion
  (filter:{_id:$id} 
    record:{
        name:$name
  			price:$price
  			discount:$discount
  			limit:$limit
  			productID:$productID
        status:$status
    }
  ){record{name price productID discount limit}}}
`

export const DELETE_PROMOTION = gql`
mutation ($id:MongoID){deletePromotion
  (filter:{_id:$id}){record{name price productID discount limit}}}
`
