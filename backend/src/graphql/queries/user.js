import { schemaComposer } from 'graphql-compose'

import { UserModel, UserTC, CustomerTC } from '../../models'

export const me = schemaComposer.createResolver({
  name: 'me',
  type: UserTC.getType(),
  resolve: async ({ context }) => {
    if (!context.user) {
      return null
    }
    const { _id } = context.user
    const user = await UserModel.findById(_id)
    return user
  },
  projection: {_id: true }
})
export const userById = UserTC.getResolver('findById')

export const customerById = CustomerTC.getResolver('findById')

export const customer = CustomerTC.getResolver('findOne')