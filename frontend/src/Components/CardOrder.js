
import { useQuery, useMutation } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";
import { ORDERS_QUERY, REMOVE_ORDER } from "../graphql/orderQuery";
import LoadingScreen from "./General/LoadingScreen";
import CardOrderAdminRow from "./Order/CardOrderAdmin-row";

const { default: CardOrderRow } = require("./Order/CardOrder-row");

const CardOrder = (props) => {
  const isCustomer = props.isCustomer ?? true
  const userType = isCustomer ? "Customer" : "Admin";
  const { loading, data, error, refetch } = useQuery(ORDERS_QUERY, { fetchPolicy: "no-cache" })
  const [mockResult, setMock] = useState()
  const [deleteOrderData] = useMutation(REMOVE_ORDER)
  const [loadingShow, setLoading] = useState(false)

  if (error) {
    // Should do somthing
  }

  const deleteOrder = async (orderID) => {
    setLoading(true)
    try {
      await deleteOrderData({ variables: { id: orderID } })
      refetch()
      setLoading(false)
      alert(`DELETE Order ID: ${orderID} Successfully`)
    } catch (error) {
      setLoading(false)
      console.log(error)
      alert("Remove Order Fail")
    }
  }

  const setLoadingShow = (loading) => {
    props?.setLoading(loading)
  }

  const refetchData = () => {
    refetch()
  }

  useEffect(() => {
    if (loading && mockResult === undefined) {
      setLoading(true)
    }

    if (data !== undefined) {
      setMock(data)
      setLoading(false)
    }

  }, [loading, data])

  return (
    <Fragment>
      <LoadingScreen show={loadingShow} />
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              {props?.type?.map((value, index) => {
                return (
                  <th
                    key={value + index}
                    className={
                      "px-6 align-middle border border-solid py-3 text-normal uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    {value}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data &&
              !loadingShow && data?.orders?.map((colDetail) => {
                return userType === "Customer" ? (
                  <CardOrderRow deleteOrder={deleteOrder} dataColumn={colDetail} key={colDetail._id} />
                ) : (
                  <CardOrderAdminRow setLoading={setLoadingShow} refetch={refetchData} dataColumn={colDetail} key={colDetail._id} />
                );
              })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
export default CardOrder;
