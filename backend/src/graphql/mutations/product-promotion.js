import { ProductTC, PromotionTC } from "../../models";
import { adminPermission } from "../queries/middleware";

export const createProduct = ProductTC.getResolver('createOne', [adminPermission])

export const createPromotion = PromotionTC.getResolver('createOne', [adminPermission])
export const updatePromotion = PromotionTC.getResolver('updateOne', [adminPermission])
export const deletePromotion = PromotionTC.getResolver('removeOne', [adminPermission])