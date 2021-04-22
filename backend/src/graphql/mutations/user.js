import { AdminTC, CustomerTC, UserTC } from '../../models'

export const createAdmin = AdminTC.getResolver('createOne')

export const createCustomer = CustomerTC.getResolver('createOne')
export const updateCustomer = CustomerTC.getResolver('updateOne')