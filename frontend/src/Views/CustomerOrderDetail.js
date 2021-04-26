import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { ORDER_QUERY } from "../graphql/orderQuery";
import CardOrderDetail from "../Components/CardOrderDetail";


const { default: CardTotal } = require("../Components/Order/CardTotal");

const CustomerOrderDetail = (props) => {
  const id =
    props?.match?.params?.id?.replace("/customer/order-detail/", "") ?? "";
  const { loading, data, error } = useQuery(ORDER_QUERY, {
    variables: { id },
    fetchPolicy: "no-cache",
  });
  const customerHeader = ["Product", "Details", "Size", "Price", "Quantity"];

  useEffect(() => {
    if (loading && data) {
        props?.showLoading(true)
    } else if (!loading || error) {
        props?.showLoading(false)
    }
}, [loading])

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mt-6">
          <CardOrderDetail
            orderDetail={data?.orderById ?? {}}
            type={customerHeader}
          />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardTotal orderDetail={data?.orderById ?? {}} />
        </div>
      </div>
    </>
  );
};
export default CustomerOrderDetail;
