import CardOrder from "../Components/CardOrder";

const CustomerOrder = () => {
  const header = ["Order Number", "Order Date", "Quantity", "Products", ""];
  return (
    <div className="flex flex-wrap mt-4 ">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-gray-500"
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className={"font-semibold text-lg text-gray-700"}>
                  Orders
                </h3>
              </div>
            </div>
          </div>
          <CardOrder type={header}/>
        </div>
      </div>
    </div>
  );
};
export default CustomerOrder;
