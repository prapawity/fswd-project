import CardOrderDetailAdm from "../../Components/CardOrderDetailAdm";
import { useQuery } from "@apollo/client";
import { ORDER_QUERY } from "../../graphql/orderQuery";
import { Fragment } from "react";

const AdminOrderDetail = (props) => {
  const adminHeader = ["Product", "Details", "Size", "Price", "Quantity", ""];
  const id =
    props?.match?.params?.id?.replace("/admin/order-detail/", "") ?? "";
  const { loading, data, error } = useQuery(ORDER_QUERY, {
    variables: { id },
    fetchPolicy: "no-cache",
  });

  if (loading && data) {
    props?.showLoading(true);
  } else {
    props?.showLoading(false);
  }

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
