const { default: CardOrderDetail } = require("../Components/CardOrderDetail");
const { default: CardTotal } = require("../Components/CardTotal");

const CustomerOrderDetail = () => {
  const customerHeader = ["Product", "Details", "Size", "Price", "Quantity"]
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mt-6">
          
          <CardOrderDetail type={customerHeader}/>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardTotal />
        </div>
      </div>
    </>
  );
};
export default CustomerOrderDetail;
