import CardOrderDetailAdmRow from "./CardOrderDetailAdm-row";
import {
  TicketIcon,
  ReceiptTaxIcon,
  CreditCardIcon,
} from "@heroicons/react/solid";
import { Fragment } from "react";

const CardOrderDetailAdm = (props) => {
  const orderDetail = props?.orderDetail ?? {};

  const orderNum = orderDetail?._id ?? "Order Num";
  const username = orderDetail?.user.username ?? "Username"
  const name = orderDetail?.user.name_surname ?? "Name Surname"
  const date = orderDetail?.timestamp ?? "Date";
  const address = orderDetail?.address ?? "Address";

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
              <p className={"text-normal text-gray-700"}>
                {address}
              </p>
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
              <p className={"text-normal text-gray-700"}>Subtotal: {orderDetail?.subtotal ?? "Subtotal"}</p>
              <p className={"text-normal text-gray-700"}>Promotion: {orderDetail?.promotion?.name ?? "Promotion"}</p>
              <p className={"text-normal text-gray-700"}>Discount: {orderDetail?.promotion?.discount ?? "Discount"}</p>
              <div className="mt-4 py-4 border-t border-blueGray-200 text-center">
                <div className="mb-2 text-blueGray-600 text-left flex flex-wrap">
                  <ReceiptTaxIcon className="text-white-600 h-6 w-6 mr-1" />
                  Total: {orderDetail?.total ?? "Total"}
                </div>
                <div className="text-blueGray-600 text-left flex flex-wrap">
                  <CreditCardIcon className="text-white-600 h-6 w-6 mr-1" />
                  Paid by:
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardOrderDetailAdm;
