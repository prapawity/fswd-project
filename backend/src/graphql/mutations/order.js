import { OrderTC } from '../../models'
import { adminPermission, needPermission } from '../queries/middleware'

export const createOrder = OrderTC.getResolver('createOne', [needPermission])
export const removeOrder = OrderTC.getResolver('removeOne', [needPermission])
export const updateOrder = OrderTC.getResolver('updateOne', [adminPermission])