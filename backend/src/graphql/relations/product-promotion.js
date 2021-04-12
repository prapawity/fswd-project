import { BaseTC, ProductTC, PromotionTC } from "../../models";

PromotionTC.addRelation(
    'productDetail', {
    resolver: () => ProductTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.productID
    },
    projection: { productID: true }
}
)
