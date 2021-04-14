import CardOrderDetailAdmRow from "./CardOrderDetailAdm-row";
import {
  TicketIcon,
  ReceiptTaxIcon,
  CreditCardIcon,
} from "@heroicons/react/solid";

const CardOrderDetailAdm = (props) => {
  const adminHeader = ["Product", "Details", "Size", "Price", "Quantity"];
  const detail = [
    [
      "Nike Joyride Run Flykni",
      "White/University Red/Pure Platinum/Midnight",
      "37",
      "$2,500 USD",
      "1",
      "",
    ],
    [
      "Nike Joyride Run Flykni",
      "White/University Red/Pure Platinum/Midnight",
      "37",
      "$2,500 USD",
      "1",
      "",
    ],
  ];
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
                  Order Number xxxxxx{" "}
                </h3>
                <h3 className={"text-normal text-gray-700"}>@Username</h3>
              </div>
              <div>
                <h3 className={"text-normal text-gray-700"}>Name-Surname</h3>
                <h3 className={"text-normal text-gray-700"}>Date: xxxxxx</h3>
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
              {detail.map((colDetail) => {
                return (
                  <CardOrderDetailAdmRow
                    column={adminHeader}
                    dataColumn={colDetail}
                    key={colDetail}
                  />
                );
              })}
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
                1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520
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
              <p className={"text-normal text-gray-700"}>Subtotal:</p>
              <p className={"text-normal text-gray-700"}>Promotion:</p>
              <p className={"text-normal text-gray-700"}>Discount:</p>
              <div className="mt-4 py-4 border-t border-blueGray-200 text-center">
                <div className="mb-2 text-blueGray-600 text-left flex flex-wrap">
                  <ReceiptTaxIcon className="text-white-600 h-6 w-6 mr-1" />
                  Total:
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
