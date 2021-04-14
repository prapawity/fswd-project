import { gql } from '@apollo/client'

export const ME_QUERY = gql`query($id: MongoID!) {
  userById(_id:$id) {
    _id
    username
    name_surname
    type
    img
  }
}
`

