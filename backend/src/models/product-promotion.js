import mongoose from 'mongoose'
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const DKey = 'type'

const DataType = {
  PROMOTION: 'PROMOTION',
  PRODUCT: 'PRODUCT'
}

const Category = {
  RUNNING: 'RUNNING',
  CASUAL: 'CASUAL',
  FOOTBALL: 'FOOTBALL',
  BASKETBALL: 'BASKETBALL',
  SANDALS: 'SANDALS',
  OTHER: 'OTHER'
}

const ProductSchema = new Schema({
  name: {
    type: String, required: true, index: true, unique: true
  },
  price: {
    type: String, required: true, index: true
  },
  type: {
    type: String,
    require: true,
    enum: Object.keys(DataType),
  },
  category: {
    type: String,
    enum: Object.keys(Category),
    default: Category.OTHER
  },
  thumpnail: {
    type: String
  },
  imageList: {
    type: [String]
  },
  timestamp: { type: Date, default: Date.now, index: true },
  size: [{
    size_number: {
      type: String,
      index: true
    },
    stock: {
      type: Number,
      index: true
    }
  }],
  description: {
    type: String
  }
})

const PromotionSchema = new Schema({
  productID: {
    type: String, required: true, index: true, ref: 'Product'
  },
  discount: {
    type: Number, required: true, index: true
  },
  limit: {
    type: Number,
    index: true,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
})

const discriminatorOptions = {
  fields: {
    remove: ['category', 'imageList', 'thumnail', 'size']
  }
}

ProductSchema.set('discriminatorKey', DKey)

export const BaseModel = mongoose.model('Product', ProductSchema)
export const PromotionModel = BaseModel.discriminator(DataType.PROMOTION, PromotionSchema)
export const ProductModel = BaseModel.discriminator(DataType.PRODUCT, ProductSchema)
export const BaseTC = composeWithMongooseDiscriminators(BaseModel)
export const PromotionTC = BaseTC.discriminator(PromotionModel, { name: DataType.PROMOTION, ...discriminatorOptions })
export const ProductTC = BaseTC.discriminator(BaseModel, { name: DataType.PRODUCT, ...[] })

export default ProductModel