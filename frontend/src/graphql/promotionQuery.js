import { gql } from '@apollo/client'

export const PROMOTIONS_QUERY_HOME = gql`query {
  promotions(sort: TIMESTAMP_DESC, limit: 3){
    productID
      name 
      price 
      discount 
      limit
      _id
      totalPrice
      productDetail{
        name 
        price 
        category
        thumpnail
      }
    }
    }`

export const PROMOTIONS_QUERY = gql`query {
    promotions{
      productID
        name 
        price 
        discount 
        limit
        _id
        totalPrice
        productDetail{
          _id
          name 
          price 
          category
          thumpnail
        }
      }
      }`

export const PROMOTION_QUERY = gql` query ($id:MongoID!) {promotionByID(_id:$id){
        productID
        name 
        type
        price 
        discount 
        limit
        _id
        totalPrice
        productDetail{
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

}}`