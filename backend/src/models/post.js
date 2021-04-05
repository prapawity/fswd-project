import mongoose from 'mongoose'
import { composeWithMongooseDiscriminators } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const DKey = 'type'
const enumPostType = {
  STATUS: 'StatusPost',
  PHOTOS: 'PhotosPost',
}
const PostSchema = new Schema({
  type: {
    type: String,
    require: true,
    enum: Object.keys(enumPostType),
    index: true,
  },
  status: { type: String, default: null },
  timestamp: { type: Date, default: Date.now },
  authorId: {
    type: String,
    require: true,
    index: true,
    ref: 'User',
  },
})
const StatusPostSchema = new Schema({
  status: { type: String, require: true },
})
const PhotoSchema = new Schema({
  url: { type: String, require: true },
  caption: { type: String },
})
const PhotosPostSchema = new Schema({
  photos: { type: [PhotoSchema], require: true },
})
PostSchema.set('discriminatorKey', DKey)

const discriminatorOptions = {
  inputType: {
    removeFields: ['timestamp'],
  },
}

export const PostModel = mongoose.model('Post', PostSchema)
export const StatusPostModel = PostModel.discriminator(enumPostType.STATUS, StatusPostSchema)
export const PhotosPostModel = PostModel.discriminator(enumPostType.PHOTOS, PhotosPostSchema)

export const PostTC = composeWithMongooseDiscriminators(PostModel)
export const StatusPostTC = PostTC.discriminator(StatusPostModel, { name: enumPostType.STATUS, ...discriminatorOptions })
export const PhotosPostTC = PostTC.discriminator(PhotosPostModel, { name: enumPostType.PHOTOS, ...discriminatorOptions })

export default PostModel
