import { PhotosPostTC, StatusPostTC } from '../../models'

export const createStatusPost = StatusPostTC.getResolver('createOne')
export const createPhotosPost = PhotosPostTC.getResolver('createOne')
