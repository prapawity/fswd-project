import { OrderTC } from "../../models/order";

export const orders = OrderTC.getResolver('findMany')
export const orderById = OrderTC.getResolver('findById')