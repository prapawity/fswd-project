import moment from 'moment'

import { CommentTC, PostTC, UserTC } from '../../models'

PostTC.addFields({
  timestamp: {
    type: 'String',
    resolve: (source) => moment(source.timestamp).fromNow(),
    projection: { timestamp: 1 },
  },
})
PostTC.addRelation(
  'author',
  {
    resolver: () => UserTC.getResolver('findById'),
    prepareArgs: {
      _id: (source) => source.authorId,
    },
    projection: { authorId: 1 },
  },
)
PostTC.addRelation(
  'comments',
  {
    resolver: () => CommentTC.getResolver('findMany'),
    prepareArgs: {
      filter: (source) => ({ postId: source._id }),
    },
    projection: { _id: 1 },
  },
)
PostTC.addRelation(
  'commentsCount',
  {
    resolver: () => CommentTC.getResolver('count'),
    prepareArgs: {
      filter: (source) => ({ postId: source._id }),
    },
    projection: { _id: 1 },
  },
)
