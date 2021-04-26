import { ProductTC, PromotionTC } from "../../models";
import { needPermission } from "./middleware";

export const products = ProductTC.getResolver('findMany')
export const product = ProductTC.getResolver('findOne')
export const productByID = ProductTC.getResolver('findById')

export const promotions = PromotionTC.getResolver('findMany')
export const promotionByID = PromotionTC.getResolver('findById', [needPermission])
