import { useMutation } from "@apollo/client"
import { ReceiptTaxIcon } from "@heroicons/react/outline"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CREATE_ORDER } from "../../graphql/orderMutation"
import { UPDATE_STOCK } from "../../graphql/productMutation"
import { UPDATE_PROMOTION } from "../../graphql/promotionMutation"
import { useHistory } from "react-router-dom"
import { useSession } from "../../contexts/SessionContext"

const CardSum = (props) => {
  const { clearCart } = useSession()
  const [create_order] = useMutation(CREATE_ORDER);
  const [update_limit] = useMutation(UPDATE_PROMOTION);
  const history = useHistory();
  const [update_stock] = useMutation(UPDATE_STOCK);
  const subTotal = props?.newOrder?.subtotal ?? 0;
  const total = props?.newOrder?.total ?? 0;
  let word = "these following product/promotion is out of stock please remove them from your cart \n";
console.log(props.limit)
  const handleCreateOrder = useCallback(
    async (e) => {
      let stock_check = true;
      e.preventDefault()
      props?.stock.map((data,index)=>{
        data.map((stock)=>{
          if(stock.stock < 0){
            word += props.product_name[index]+" size "+stock.size_number+"\n"
            stock_check = false;
          }
        })
      })
      if(stock_check){
      props?.setShowLoading(true)
      try {
        console.log(props?.newOrder);
        props?.product_id?.map(async (id, index) => await update_stock({ variables: { id: id, size: props?.stock[index] ?? [] } }))
        props?.promo_id?.map(async (id, index) => {
          let stat = true
          if(props?.limit[index] < 1){
            stat = false
          }
          await update_limit({ variables: { id: id, limit: props?.limit[index], status: stat } })
        })
        await create_order({ variables: { record: props.newOrder } });
        clearCart()
        props?.setShowLoading(false)
        alert("order suscessful");
        history.push("/");
      } catch (err) {
        console.log(err);
        props?.setShowLoading(false)
        alert("order failed");
      }}
      else{
        history.push("/customer/cart");
        alert(word)
      }
    },
    [props?.newOrder]
  );

  return (
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
          {props?.type === "Payment" ? (
            <button
              className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-sm px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
              type="button"
              onClick={handleCreateOrder}
            >
              Pay Now
            </button>
          ) : null}
          {props?.type === "Cart" && props?.newOrder?.productsID?.length !== 0 ? (
            <Link
              to={{
                pathname: "/customer/checkout"
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
          {props?.type === "Checkout" && props?.newOrder?.address !== "" ? (
            <Link
              to={{
                pathname: "/customer/payment",
                state: {
                  newOrder: props.newOrder,
                }
              }}
            >
              <button
                className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-sm px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
                type="button"
              >
                Next
                </button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default CardSum;
