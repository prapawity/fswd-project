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
  //   console.log(data?.productByID?.price)
  if (type === "product_id") {
    return promo?.promotionByID?.productDetail?._id
  }
  if (type === "limit") {
    return promo?.promotionByID?.limit
  }
  if (props?.type === "PRODUCT") {
    if (data?.productByID !== undefined) {
      const index = data?.productByID?.size.findIndex(size => (size.size_number) === (props.size))
      //   console.log(index)
      let result = [...data?.productByID?.size]
      let item = { ...result[index] }
      item.stock -= all.filter((prod) => prod.id === props.id && prod.size === props.size).length;
      result[index] = item
      //   result[index].stock = data.productByID.size[index].stock-1
      // console.log(result)
      // console.log(all.filter((prod) => prod.id === props.id &&  prod.size === props.size).length)
      let send = []
      result.map((prod) => (
        send.push({ stock: prod.stock, size_number: prod.size_number })
      ))
      // console.log(send)
      return (send);
    }
    // 

  }
  if (props?.type === "PROMOTION") {
    if (promo?.promotionByID !== undefined) {
      const index = promo?.promotionByID?.productDetail?.size.findIndex(size => (size.size_number) === (props.size))
      //   console.log(promo?.promotionByID?.productDetail)
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
