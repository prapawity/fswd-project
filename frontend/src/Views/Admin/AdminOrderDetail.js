
import { useQuery } from "@apollo/client";
import { ORDER_QUERY } from "../../graphql/orderQuery";
import { Fragment, useEffect } from "react";
import CardOrderDetailAdm from "../../Components/Order/CardOrderDetailAdm";

const AdminOrderDetail = (props) => {
  const adminHeader = ["Product", "Details", "Size", "Price", "Quantity", ""];
  const id =
    props?.match?.params?.id?.replace("/admin/order-detail/", "") ?? "";
  const { loading, data, error } = useQuery(ORDER_QUERY, {
    variables: { id },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (loading && data) {
      props?.showLoading(true)
    } else if (!loading || error) {
      props?.showLoading(false)
    }
  }, [loading])

  if (data) {
    console.log(data);
  }
  return (
    <div className="flex flex-wrap mt-4 w-full mb-12 px-4">
      {data && data?.orderById ? (
        <CardOrderDetailAdm
          orderDetail={data?.orderById ?? {}}
          type={adminHeader}
        />
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  );
};
export default AdminOrderDetail;
