import { AdminTC, CustomerTC, UserTC } from '../../models'
import { needPermission } from '../queries/middleware'

export const createAdmin = AdminTC.getResolver('createOne')

export const createCustomer = CustomerTC.getResolver('createOne')
export const updateCustomer = CustomerTC.getResolver('updateOne', [needPermission])