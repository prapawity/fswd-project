
import { useQuery, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { ORDERS_QUERY, REMOVE_ORDER } from "../graphql/orderQuery";
import CardOrderAdminRow from "./Order/CardOrderAdmin-row";

const { default: CardOrderRow } = require("./Order/CardOrder-row");

const CardOrder = (props) => {
  const isCustomer = props.isCustomer ?? true
  const userType = isCustomer ? "Customer" : "Admin";
  const { data, error } = useQuery(ORDERS_QUERY, { fetchPolicy: "network-only" })
  const [deleteOrderData] = useMutation(REMOVE_ORDER, { refetchQueries: [{ query: ORDERS_QUERY }] })

  if (error) {
    // Should do somthing
  }

  const deleteOrder = async (orderID) => {
    try {
      await deleteOrderData({ variables: { id: orderID } })
      alert(`DELETE Order ID: ${orderID} Successfully`)
    } catch (error) {
      console.log(error)
      alert("Remove Order Fail")
    }
  }

  return (
    <div className="block w-full overflow-x-auto">
      <table className="items-center w-full bg-transparent border-collapse">
        <thead>
          <tr>
            {props.type.map((data) => {
              return (
                <th
                  key={data}
                  className={
                    "px-6 align-middle border border-solid py-3 text-normal uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  {data}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.orders.map((colDetail) => {
              return userType === "Customer" ? (
                <CardOrderRow deleteOrder={deleteOrder} dataColumn={colDetail} key={colDetail._id} />
              ) : (
                <CardOrderAdminRow dataColumn={colDetail} key={colDetail._id} />
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default CardOrder;
