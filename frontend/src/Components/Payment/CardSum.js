import { useMutation, useQuery } from "@apollo/client"
import { ReceiptTaxIcon, TicketIcon } from "@heroicons/react/outline"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CREATE_ORDER } from "../../graphql/orderMutation"
import { UPDATE_STOCK } from "../../graphql/productMutation"
import { UPDATE_PROMOTION } from "../../graphql/promotionMutation"
import { useHistory } from "react-router-dom"
import { useSession } from "../../contexts/SessionContext"
import { useToasts } from 'react-toast-notifications'

const CardSum = (props) => {
  const { clearCart } = useSession()
  const [create_order] = useMutation(CREATE_ORDER);
  const [update_limit] = useMutation(UPDATE_PROMOTION);
  const history = useHistory();
  const [update_stock] = useMutation(UPDATE_STOCK);
  const subTotal = parseFloat(props?.newOrder?.subtotal ?? 0)
  const total = parseFloat(props?.newOrder?.total ?? 0)
  const discount = (subTotal - total) ?? 0;
  const [newOrder, setOr] = useState(props?.newOrder ?? {})
  const { addToast } = useToasts()
  let word = "these following product/promotion is out of stock please remove them from your cart \n";
  let check_limit = false;
  const uploading = async (stockProd) => {
    if (stockProd.type === "PRODUCT") {
      try {
        await update_stock({
          variables: {
            id: stockProd?.id, size: stockProd?.size
          }
        })

      } catch (error) {

        alert("Error")
      }
    } else if (stockProd.type === "PROMOTION") {
      try {
        try {
          await update_stock({
            variables: {
              id: stockProd?.productDetail?._id, size: stockProd?.size
            }
          })

        } catch (error) {

          alert("Error")
        }
        await update_limit({ variables: { id: stockProd?.id, limit: stockProd?.qualtity, status: stockProd?.limit !== 0 } })

      } catch (error) {

        alert("Error")
      }
    }
  }

  const handleCreateOrder = useCallback(
    async (e) => {
      e.preventDefault()
      props?.setShowLoading(true)
      let stock = props?.getStock() ?? []

      stock?.map((prod) => {
        if (prod?.type === "PROMOTION") {
          if (prod.qualtity < 0) {
            check_limit = true;
          }
        }
      })
      if (stock?.filter((prod) => {
        if (prod?.type === "PROMOTION") {
          return prod?.quantity < 0 && prod?.size?.filter((size) => size?.stock < 0).length > 0
        } else {
          return prod?.size?.filter((size) => size?.stock < 0).length > 0
        }
      }).length > 0 || stock?.length === 0 || check_limit) {
        clearCart()

        props?.setShowLoading(false)
        history.push("/products");
        addToast(word, { appearance: 'error', autoDismiss: true })
      } else {
        stock?.map((stockProd) => {
          uploading(stockProd)
        })
        try {
          await create_order({ variables: { record: newOrder } });
          clearCart()

          props?.setShowLoading(false)
          alert("order suscessful");
          history.push("/");
        } catch (err) {

          props?.setShowLoading(false)
          alert("order failed");
        }
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
          <div className="mb-2 text-red-600 text-left">
            <div className="flex flex-wrap">
              <TicketIcon className="text-white-600 h-6 w-6 mr-1" />
                Discount: {discount.toLocaleString("th-TH", {
                style: "currency",
                currency: "THB",
              })}
            </div>
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
