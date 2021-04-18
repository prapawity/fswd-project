import { useQuery } from "@apollo/client";
import { ORDER_QUERY } from "../graphql/orderQuery";

const { default: CardOrderDetail } = require("../Components/CardOrderDetail");
const { default: CardTotal } = require("../Components/CardTotal");

const CustomerOrderDetail = (props) => {
  const id =
    props?.match?.params?.id?.replace("/customer/order-detail/", "") ?? "";
  const { loading, data, error } = useQuery(ORDER_QUERY, {
    variables: { id },
    fetchPolicy: "no-cache",
  });
  const customerHeader = ["Product", "Details", "Size", "Price", "Quantity"];

  if (loading && data) {
    props?.showLoading(true);
  } else if (!loading || error) {
    props?.showLoading(false);
  }

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
