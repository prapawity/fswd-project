import { ProductTC, PromotionTC } from "../../models";

export const products = ProductTC.getResolver('findMany')

export const promotions = PromotionTC.getResolver('findMany')