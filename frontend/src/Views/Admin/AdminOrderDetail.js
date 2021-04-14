import CardOrderDetailAdm from "../../Components/CardOrderDetailAdm";

const { default: CardOrderDetail } = require("../../Components/CardOrderDetail")
const { default: CardTotal } = require("../../Components/CardTotal")


const AdminOrderDetail = () => {
    const adminHeader = ["Product", "Details", "Size", "Price", "Quantity", "" ]
  return (
    <div className="flex flex-wrap mt-4 w-full mb-12 px-4">
        
        <CardOrderDetailAdm type={adminHeader}/>
    </div>
  );

};
export default AdminOrderDetail;
