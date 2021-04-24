import { schemaComposer } from "graphql-compose";
import OrderModel, { OrderTC } from "../../models/order";
import { needPermission } from "./middleware";

export const orders = schemaComposer.createResolver({
    name: 'Orders',
    type: [OrderTC.getType()],
    resolve: async ({ context }) => {
        if (context.user.type === "Customer") {
            return await OrderModel.find({ userID: context.user._id })
        } else {
            return await OrderModel.find()
        }
    },
    projection: { _id: true }
},
    [needPermission])

export const orderById = schemaComposer.createResolver({
    name: 'OrderByID',
    type: OrderTC.getType(),
    args: {
        _id: 'MongoID!'
    },
    resolve: async ({ args, context }) => {
        const { _id } = args
        const order = await OrderModel.findById(_id)

        if (!order) {
            return null
        }

        if (context.user.type === "Customer" && context.user._id !== order.userID) {
            return null
        }
        return order
    },
    projection: { _id: true }
},
    [needPermission])