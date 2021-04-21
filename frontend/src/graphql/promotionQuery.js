import { gql } from '@apollo/client'

export const PROMOTIONS_QUERY = gql`query {
    promotions{
      productID
        name 
        price 
        discount 
        limit
        _id
        totalPrice
        productDetail{name price}
      }
      }`

export const PROMOTION_QUERY = gql` query ($id:MongoID!) {promotionByID(_id:$id){
  productID
        name 
        price 
        discount 
        limit
        _id
        totalPrice
        productDetail{name price}

}}`