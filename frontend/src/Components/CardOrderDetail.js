import { Fragment } from "react";

const { default: CardOrderDetailPdt } = require("./Order/CardOrderDetail-row");

const CardOrderDetail = (props) => {
  const orderDetail = props?.orderDetail ?? {};
  const orderNum = orderDetail?._id ?? "Order Num";
  const address = orderDetail?.address ?? "Address";
  const date = orderDetail?.timestamp ?? "Date";

  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-gray-600"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-gray-700"}>
                Order Number {orderNum}
              </h3>
              <p className={"text-xs text-gray-700"}>Date {date}</p>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {props.type.map((head) => {
                  return (
                    <th
                      key={head}
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center bg-gray-50 text-gray-500 border-gray-100"
                      }
                    >
                      {head}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {orderDetail ? (
                <CardOrderDetailPdt
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
              <h3 className={"font-semibold text-lg text-gray-700"}>Address</h3>
              <p className={"text-xs text-gray-700"}>{address}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardOrderDetail;
