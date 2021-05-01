import CardOrderDetailAdmRow from "./CardOrderDetailAdm-row";
import { ReceiptTaxIcon, CreditCardIcon } from "@heroicons/react/solid";
import { Fragment, useCallback, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_ORDER_PRODUCTS,
  UPDATE_ORDER_STATUS,
} from "../../graphql/orderMutation";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { REMOVE_ORDER } from "../../graphql/orderQuery";
import { UPDATE_STOCK } from "../../graphql/productMutation";
import { PRODUCTS_QUERY } from "../../graphql/productQuery";
import { PROMOTIONS_QUERY } from "../../graphql/promotionQuery";
import { useSession } from "../../contexts/SessionContext";

const CardOrderDetailAdm = (props) => {
  const orderDetail = props?.orderDetail ?? {};
  const history = useHistory();
  const { addToast } = useToasts();
  const orderNum = orderDetail?._id ?? "Order Num";
  const username = orderDetail?.user?.username ?? "Username";
  const name = orderDetail?.user?.name_surname ?? "Name Surname";
  const date = orderDetail?.timestamp ?? "Date";
  const address = orderDetail?.address ?? "Address";
  const [statusOrder, setStatus] = useState(orderDetail?.status ?? "Status");
  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS);
  const [updateOrderProducts] = useMutation(UPDATE_ORDER_PRODUCTS);
  const [removeOrder] = useMutation(REMOVE_ORDER);
  const [updateProduct] = useMutation(UPDATE_STOCK);
  const { data, refetch } = useQuery(PRODUCTS_QUERY);
  const { data: promotionData, refetch: refetchPromo } = useQuery(PROMOTIONS_QUERY);
  const { setLoading } = useSession();
  const handleInputChange = useCallback((e) => {
    setStatus(e.target.value);
  }, []);

  const redirectBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const saveOrder = async () => {
    try {
      await updateOrderStatus({
        variables: { id: orderNum, status: statusOrder },
      });
      addToast(`Update Order Success`, {
        appearance: "success",
        autoDismiss: true,
      });
      redirectBack();
    } catch (error) {
      console.log("Error");
      alert("Update Error");
    }
  };

  const updateProductData = async (sizeData) => {
    let resultProduct = data?.products?.filter(
      (prod) => prod?._id === sizeData?.id
    )[0];
    if (resultProduct === undefined) {
      resultProduct = data?.products?.filter(
        (prod) =>
          prod?._id ===
          (promotionData?.promotions?.filter(
            (promo) => promo?._id === sizeData?.id
          )[0]?.productDetail?._id ?? "")
      )[0];
    }

    if (resultProduct !== undefined) {
      const newSize = resultProduct?.size ?? [];

      const result = newSize.map((size) => {
        if (size?.size_number === sizeData?.size) {
          return { size_number: size?.size_number, stock: size?.stock + 1 };
        }
        return size;
      });

      if (result?.length > 0) {
        try {
          await updateProduct({
            variables: { id: resultProduct?._id ?? 0, size: result },
          });
          refetch();
          refetchPromo()
          props?.refetch()
          console.log("UPDATE DATA SUCCESS");
        } catch (error) {
          console.log(error);
          alert("UPDATE PRODUCT ERROR");
        }
      }
    }
  };

  console.log("ORDER DETAIL", orderDetail);

  const deleteProduct = async (sizeProduct) => {
    const result = orderDetail?.productsID?.filter(
      (product) => product._id !== sizeProduct?._id
    );
    setLoading(true);
    await updateProductData(sizeProduct);
    try {
      if (result?.length === 0) {
        await removeOrder({ variables: { id: orderNum } });
        addToast(`Remove Order Success`, {
          appearance: "error",
          autoDismiss: true,
        });
        redirectBack();
        setLoading(false);
      } else {
        await updateOrderProducts({
          variables: { id: orderNum, products: result },
        });
        addToast(`Remove Product in Order Success`, {
          appearance: "error",
          autoDismiss: true,
        });

        props?.refetch();
        setLoading(false);
      }
    } catch (error) {
      console.log("Error");
      alert("Update Error");
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-gray-600"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex justify-between">
              <div>
                <h3 className={"font-semibold text-2xl text-gray-700"}>
                  Order Number {orderNum}{" "}
                </h3>
                <h3 className={"text-normal text-gray-700"}>@{username}</h3>
              </div>
              <div>
                <h3 className={"text-normal text-gray-700"}>{name}</h3>
                <h3 className={"text-normal text-gray-700"}>Date: {date}</h3>
              </div>
              <div>
                <div className="ml-2 flex items-center h-full">
                  <select
                    value={statusOrder}
                    onChange={handleInputChange}
                    className={`bg-${
                      statusOrder === "INPROCESS" ? "yellow" : "green"
                    }-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150`}
                  >
                    <option value={"INPROCESS"}>Inprocress</option>
                    <option value={"COMPLETED"}>Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {props.type.map((data) => {
                  return (
                    <th
                      key={data}
                      className={
                        "px-6 align-middle border border-solid py-3 text-normal uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
                      }
                    >
                      {data}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {orderDetail ? (
                <CardOrderDetailAdmRow
                  dataColumn={orderDetail}
                  key={orderDetail?._id ?? 0}
                  deleteProduct={deleteProduct}
                />
              ) : (
                <Fragment></Fragment>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-gray-600"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-2xl text-gray-700"}>
                Address
              </h3>
              <p className={"text-normal text-gray-700"}>{address}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-gray-600"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-2xl text-gray-700"}>
                Summary
              </h3>
              <p className={"text-normal text-gray-700"}>
                Subtotal:{" "}
                {parseFloat(orderDetail?.subtotal ?? 0).toLocaleString(
                  "th-TH",
                  {
                    style: "currency",
                    currency: "THB",
                  }
                )}
              </p>
              <p className={"text-normal text-gray-700"}>
                Promotion:{" "}
                {orderDetail?.products
                  ?.filter((prod) => prod?.type === "PROMOTION")
                  .map((promo, indexPromo) => {
                    console.log(promo, "CHECK");
                    return (indexPromo === 0 ? "" : ", ") + (promo?.name ?? "");
                  })}
              </p>
              <p className={"text-normal text-red-700"}>
                Discount:{" "}
                {(
                  parseFloat(orderDetail?.subtotal ?? 0) -
                  parseFloat(orderDetail?.total ?? 0)
                ).toLocaleString("th-TH", {
                  style: "currency",
                  currency: "THB",
                })}
              </p>
              <div className="mt-4 py-4 border-t border-blueGray-200 text-center">
                <div className="mb-2 text-blueGray-600 text-left flex flex-wrap">
                  <ReceiptTaxIcon className="text-white-600 h-6 w-6 mr-1" />
                  Total: {orderDetail?.total ?? "Total"}
                </div>
                <div className="text-blueGray-600 text-left flex flex-wrap">
                  <CreditCardIcon className="text-white-600 h-6 w-6 mr-1" />
                  Paid by: Credit-Card
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <button
          onClick={saveOrder}
          className="w-full bg-green-600 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          Save
        </button>
      </div>
    </>
  );
};
export default CardOrderDetailAdm;
