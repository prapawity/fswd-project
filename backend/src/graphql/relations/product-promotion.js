import { schemaComposer } from "graphql-compose";
import { ProductModel, ProductTC, PromotionTC } from "../../models";

const customPricePromotion = schemaComposer.createResolver({
    name: "customPricePromotion",
    type: 'String',
    args: {
        productID: 'String!',
        discount: 'Float!'
    },

    resolve: (async ({ source, args, context, info }) => {
        const product = await ProductModel.findById(args.productID).exec()

        if (!product) return null
        return (parseFloat(product.price) - parseFloat(product.price) * (args.discount / 100)).toString()
    })
})

PromotionTC.addRelation(
    'productDetail', {
    resolver: () => ProductTC.getResolver('findById'),
    prepareArgs: {
        _id: (source) => source.productID
    },
    projection: { productID: true }
}
)

PromotionTC.addRelation('totalPrice', {
    resolver: () => customPricePromotion,
    prepareArgs: {
        productID: (source) => source.productID,
        discount: (source) => source.discount
    },
    projection: { productID: true, discount: true },
})