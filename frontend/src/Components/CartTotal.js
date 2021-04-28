import { useQuery } from "@apollo/client";
import { PRODUCT_QUERY } from "../graphql/productQuery";
import { PROMOTION_QUERY } from "../graphql/promotionQuery"

const CartTotal = (props, type) => {
  const { loading, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: props?.id },
  }); const { loading: loading1, data: promo } = useQuery(PROMOTION_QUERY, {
    variables: { id: props?.id },
  });
  // console.log(data?.productByID?.price)
  if (props?.type === "PRODUCT") {
    return parseFloat(data?.productByID?.price ?? 0);
  }
  if (props?.type === "PROMOTION" && type === "total") {
    return parseFloat(promo?.promotionByID?.totalPrice ?? 0);
  }
  if (props?.type === "PROMOTION" && type === "subtotal") {
    return parseFloat(promo?.promotionByID?.productDetail?.price ?? 0);
  }
};
export default CartTotal;
