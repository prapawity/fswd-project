import { ProductTC, PromotionTC } from "../../models";
import { adminPermission, needPermission} from "../queries/middleware";

export const createProduct = ProductTC.getResolver('createOne', [adminPermission])
export const updateProduct = ProductTC.getResolver('updateOne',[needPermission])
export const deleteProduct = ProductTC.getResolver('removeOne', [adminPermission])

export const createPromotion = PromotionTC.getResolver('createOne', [adminPermission])
export const updatePromotion = PromotionTC.getResolver('updateOne', [needPermission])
export const deletePromotion = PromotionTC.getResolver('removeOne', [adminPermission])