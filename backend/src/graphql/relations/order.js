import {
  OrderTC,
  ProductTC,
  PromotionTC,
  UserTC,
  ProductModel,
} from "../../models";
import moment from 'moment'


OrderTC.addRelation("user", {
  resolver: () => UserTC.getResolver("findById"),
  prepareArgs: {
    _id: (source) => source.userID,
  },
  projection: { userID: 1 },
});

OrderTC.addRelation("promotion", {
  resolver: () => PromotionTC.getResolver("findById"),
  prepareArgs: {
    _id: (source) => source.promotionID,
  },
  projection: { promotionID: 1 },
});

OrderTC.addRelation("products", {
  resolver: () => ProductTC.getResolver("findByIds"),
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
