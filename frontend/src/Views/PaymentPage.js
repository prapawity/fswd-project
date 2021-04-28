import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import CardPayment from "../Components/Payment/CardPayment";
import CardSum from "../Components/Payment/CardSum";
import StockQuery from "../Components/StockQuery";
import { useSession } from "../contexts/SessionContext";
import { PRODUCT_QUERTY } from "../graphql/productQuery";

const CustomerPayment = (props) => {
  const history = useHistory();
  const { cart, clearCart } = useSession();
  let dataShow = [];
  let stock = [];
  let product_id = [];
  let promo_id = [];
  let limit = [];
  if (props.location.newOrder === undefined) {
    history.push("/checkout");
  }
  else{

  const calculateContent = () => {
    dataShow = [];
    cart?.map((prod) => {
      let inData = false;
      inData =
        dataShow.filter(
          (dataProd) => dataProd.id === prod.id && dataProd.size === prod.size
        ).length === 0;
      if (inData) {
        dataShow.push(prod);
      }
    });
  };
  calculateContent();

  dataShow.map((dataColumn) => {
    stock.push(StockQuery(dataColumn,cart));
    if(dataColumn.type === "PROMOTION"){
      product_id.push(StockQuery(dataColumn,cart,"product_id"))
      if(promo_id.filter((dataProd) => dataProd.id === dataColumn.id).length === 0){
        promo_id.push(dataColumn.id)
        limit.push(StockQuery(dataColumn,cart,"limit")-cart.filter((dataProd) => dataProd.id === dataColumn.id).length)
      }
    }else{
      product_id.push(dataColumn.id)
    }
  });

  let j=0;
  dataShow.map((dataColumn) => {
    let i=0;
    dataShow.map((data) => {
      if(data.id===dataColumn.id){
        for (let index = 0; index < stock[i].length; index++) {
          if(stock[i][index].stock>stock[j][index].stock){
            let item = {...stock[i][index]}
            item.stock = stock[j][index].stock;
            stock[i][index] = item
            // stock[i][index].stock = stock[j][index].stock
          }
        }
      }
      i++
    })
    j++;
  });

}
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mt-6">
          <CardPayment />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSum type="Payment" newOrder={props.location.newOrder} stock={stock} product_id={product_id} promo_id={promo_id} limit={limit} clearCart={clearCart}/>
        </div>
      </div>
    </>
  );
};
export default CustomerPayment;
