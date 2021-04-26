import { OrderTC } from '../../models'
import { needPermission } from '../queries/middleware'

export const createOrder = OrderTC.getResolver('createOne', [needPermission])
export const removeOrder = OrderTC.getResolver('removeOne', [needPermission])