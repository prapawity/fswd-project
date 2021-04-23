import {
  OrderTC,
  UserTC,
  BaseTC,
  BaseModel,
  PromotionModel,
} from "../../models";
import moment from 'moment'
import { schemaComposer } from "graphql-compose";


OrderTC.addRelation("user", {
  resolver: () => UserTC.getResolver("findById"),
  prepareArgs: {
    _id: (source) => source.userID,
  },
  projection: { userID: 1 },
});

const customFieldOrder = schemaComposer.createResolver({
  name: "customFieldOrder",
  type: [BaseTC.getType()],
  args: {
    _ids: "[String]"
  },

  resolve: (async ({ source, args, context, info }) => {
    console.log("CHECK ARGS", args)
    const reponse = await args._ids.map(async (id) => {
      let result = await BaseModel.findById(id).exec()

      if (result === null) {
        result = await PromotionModel.findById(id).exec()
      }
      return result

    })
    return reponse
  })
})

OrderTC.addRelation("products", {
  resolver: () => customFieldOrder,
  prepareArgs: {
    _ids: (source) => {
      const id = []
      source.productsID.map((data) => id.push(data.id))
      return id
    },
  },
  projection: { productsID: true },
});

OrderTC.addFields({
  timestamp: {
    type: 'String',
    resolve: (source) => moment(source.timestamp).fromNow(),
    projection: { timestamp: 1 },
  },
})
