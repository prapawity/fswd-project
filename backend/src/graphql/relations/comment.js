import moment from 'moment'

import { CommentTC, UserTC } from '../../models'

CommentTC.addFields({
  timestamp: {
    type: 'String',
    resolve: (source) => moment(source.timestamp).fromNow(),
    projection: { timestamp: 1 },
  },
})
CommentTC.addRelation(
  'author',
  {
    resolver: () => UserTC.getResolver('findById'),
    prepareArgs: {
      _id: (source) => source.authorId,
    },
    projection: { authorId: 1 },
  },
)
