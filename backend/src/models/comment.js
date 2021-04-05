import mongoose from 'mongoose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

const { Schema } = mongoose

const CommentSchema = new Schema({
  postId: {
    type: String,
    required: true,
    index: true,
    ref: 'Post',
  },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  authorId: {
    type: String,
    require: true,
    index: true,
    ref: 'User',
  },
})

const baseOptions = {
  inputType: {
    removeFields: ['timestamp'],
  },
}

export const CommentModel = mongoose.model('Comment', CommentSchema)

export const CommentTC = composeWithMongoose(CommentModel, baseOptions)

export default CommentModel
