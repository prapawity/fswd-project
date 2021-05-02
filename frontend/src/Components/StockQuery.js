import { useQuery } from "@apollo/client";
import { PRODUCT_QUERY } from "../graphql/productQuery";
import { PROMOTION_QUERY } from "../graphql/promotionQuery";

const StockQuery = (props, all, type) => {
  const { loading, data } = useQuery(PRODUCT_QUERY, {
    variables: { id: props?.id },
  });
  const { loading: loading1, data: promo } = useQuery(PROMOTION_QUERY, {
    variables: { id: props?.id },
  });

  if (type === "product_id") {
    return promo?.promotionByID?.productDetail?._id
  }
  if (type === "limit") {
    return promo?.promotionByID?.limit
  }
  if (type === "name") {
    return data?.productByID?.name ?? promo?.promotionByID?.productDetail?.name ?? "name"
  }
  if (props?.type === "PRODUCT") {
    if (data?.productByID !== undefined) {
      const index = data?.productByID?.size.findIndex(size => (size.size_number) === (props.size))

      let result = [...data?.productByID?.size]
      let item = { ...result[index] }
      item.stock -= all.filter((prod) => prod.id === props.id && prod.size === props.size).length;
      result[index] = item

      let send = []
      result.map((prod) => (
        send.push({ stock: prod.stock, size_number: prod.size_number })
      ))

      return (send);
    }
    // 

  }
  if (props?.type === "PROMOTION") {
    if (promo?.promotionByID !== undefined) {
      const index = promo?.promotionByID?.productDetail?.size.findIndex(size => (size.size_number) === (props.size))

      let result = [...promo?.promotionByID?.productDetail?.size]
      let item = { ...result[index] }
      item.stock -= all.filter((prod) => prod.id === props.id && prod.size === props.size).length;
      result[index] = item
      let send = []
      result.map((prod) => (
        send.push({ stock: prod.stock, size_number: prod.size_number })
      ))
      return (send);
    }
  } else {
    return null;
  }
};
export default StockQuery;
