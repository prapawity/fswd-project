import { OrderTC } from '../../models'
import { needPermission } from '../queries/middleware'

export const createOrder = OrderTC.getResolver('createOne', [needPermission])