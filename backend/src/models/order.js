import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const StatusType = {
  INPROCESS: "INPROCESS",
  COMPLETED: "COMPLETED",
};

const OrderSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  shippingFee: {
    type: Number,
  },
  total: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: Object.keys(StatusType),
    default: StatusType.INPROCESS,
  },
  productsID: [{
    id: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    }
  }],
  userID: {
    type: String,
    required: true,
    index: true,
    ref: "User",
  }
});

export const OrderModel = mongoose.model("Order", OrderSchema);

export const OrderTC = composeWithMongoose(OrderModel);

export default OrderModel;
