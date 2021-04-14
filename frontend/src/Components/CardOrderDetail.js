const { default: CardOrderDetailPdt } = require("./CardOrderDetail-row");

const CardOrderDetail = (props) => {
  const detail = [
    [
      "Nike Joyride Run Flykni",
      "White/University Red/Pure Platinum/Midnight",
      "37",
      "$2,500 USD",
      "1",
    ],
    [
      "Nike Joyride Run Flykni",
      "White/University Red/Pure Platinum/Midnight",
      "37",
      "$2,500 USD",
      "1",
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
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-gray-700"}>
                Order Number xxxxxx
              </h3>
              <p className={"text-xs text-gray-700"}>Date xxxxxx</p>
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
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-gray-50 text-gray-500 border-gray-100"
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
                  <CardOrderDetailPdt dataColumn={colDetail} key={colDetail} />
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
              <h3 className={"font-semibold text-lg text-gray-700"}>Address</h3>
              <p className={"text-xs text-gray-700"}>
                1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardOrderDetail;
