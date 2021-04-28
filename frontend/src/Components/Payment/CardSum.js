import { useMutation } from "@apollo/client";
import { ReceiptTaxIcon } from "@heroicons/react/outline";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CREATE_ORDER } from "../../graphql/orderMutation";
import { UPDATE_STOCK } from "../../graphql/productMutation";
import { UPDATE_PROMOTION } from "../../graphql/promotionMutation";
import { useHistory } from "react-router-dom";

const CardSum = (props) => {
  const [create_order] = useMutation(CREATE_ORDER);
  const [update_limit] = useMutation(UPDATE_PROMOTION);
  const history = useHistory();
  const [update_stock] = useMutation(UPDATE_STOCK);
  const subTotal = props?.newOrder?.subtotal ?? 0;
  const total = props?.newOrder?.total ?? 0;
  const handleCreateOrder = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        console.log(props?.newOrder);
        for (let index = 0; index < props.product_id.length; index++) {
          // console.log(props.stock[index])
          await update_stock({variables:{id:props.product_id[index], size:props.stock[index]}})
        }
        for (let index = 0; index < props.promo_id.length; index++) {
          await update_limit({variables:{id:props.promo_id[index], limit:props.limit[index]}})
        }
        await create_order({ variables: { record: props.newOrder } });
        props.clearCart()
        alert("order suscessful");
        history.push("/home");
      } catch (err) {
        console.log(err);
        alert("order failed");
      }
    },
    [props.newOrder]
  );
  // console.log(props.newOrder.productsID)

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-6">
        <div className="px-6">
          <div className="text-center mt-10">
            <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
              Order Summary
            </h3>
          </div>
          <div className="py-8 border-t border-blueGray-200 text-center">
            <div className="mb-2 text-blueGray-600 text-left">
              Subtotal:{" "}
              {parseFloat(subTotal).toLocaleString("th-TH", {
                style: "currency",
                currency: "THB",
              })}
            </div>
            <div className="mb-8 text-blueGray-600 text-left flex flex-wrap ">
              <ReceiptTaxIcon className="text-white-600 h-6 w-6 mr-1" />
              Total:{" "}
              {parseFloat(total).toLocaleString("th-TH", {
                style: "currency",
                currency: "THB",
              })}
            </div>
            {props.type === "Payment" ? (
              <button
                className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-sm px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
                type="button"
                onClick={handleCreateOrder}
              >
                Pay Now
              </button>
            ) : null}
            {props.type === "Cart" && props?.newOrder?.productsID?.length !== 0  ?(
              <Link
                to={{
                  pathname: "/checkout"}}
              >
                <button
                  className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-sm px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
                  type="button"
                  // onClick={redirectToOrderDetail}
                >
                  Next
                </button>
              </Link>
            ) : null}
            {props.type === "Checkout" && props?.newOrder?.address !== "" ? (
              <Link
                to={{
                  pathname: "customer/payment",
                  newOrder: props.newOrder,
                }}
              >
                <button
                  className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-sm px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
                  type="button"
                  // onClick={redirectToOrderDetail}
                >
                  Next
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default CardSum;
