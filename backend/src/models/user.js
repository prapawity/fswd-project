import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const DKey = 'type'

const enumUserType = {
  CUSTOMER: 'Customer',
  ADMIN: 'Admin',
}

const UserSchema = new Schema({
  type: {
    type: String,
    require: true,
    enum: Object.keys(enumUserType),
    index: true,
  },
  username: {
    type: String, required: true, index: true, unique: true,
  },
  password: { type: String, require: true, bcrypt: true },
  name_surname: {
    type: String, required: true,
  }
})
UserSchema.plugin(bcrypt)

const AdminSchema = new Schema({

})

const CustomerSchema = new Schema({
  email: { type: String },
  tel: { type: String },
  address: { type: String }
})

UserSchema.set('discriminatorKey', DKey)

const discriminatorOptions = {
  inputType: {
    removeFields: ['timestamp'],
  },
}

export const UserModel = mongoose.model('User', UserSchema)
export const AdminModel = UserModel.discriminator(enumUserType.ADMIN, AdminSchema)
export const CustomerModel = UserModel.discriminator(enumUserType.CUSTOMER, CustomerSchema)

export const UserTC = composeWithMongooseDiscriminators(UserModel).removeField('password')
export const AdminTC = UserTC.discriminator(AdminModel, { name: enumUserType.ADMIN, ...discriminatorOptions })
export const CustomerTC = UserTC.discriminator(CustomerModel, { name: enumUserType.CUSTOMER, ...discriminatorOptions })
export default UserModel
