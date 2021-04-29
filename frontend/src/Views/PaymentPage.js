import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CardPayment from "../Components/Payment/CardPayment";
import CardSum from "../Components/Payment/CardSum";
import StockQuery from "../Components/StockQuery";
import { useSession } from "../contexts/SessionContext";

const CustomerPayment = (props) => {
  const history = useHistory();
  const { cart } = useSession();
  const [newOrder, setNewOrder] = useState(props?.location?.state?.newOrder  ?? undefined)
  const showLoading = (show) => props?.showLoading(show)
  let dataShow = [];
  let stock = [];
  let product_id = [];
  let promo_id = [];
  let limit = [];
  let product_name = [];

  if (props?.location?.state?.newOrder === undefined) {
    history.push("/customer/checkout");
  }

  useEffect(() => {
    if (newOrder === undefined) {
      history.push("/customer/checkout");
    }
  }, [newOrder])

  const calculateContent = () => {
    dataShow = [];
    cart?.map((prod) => {
      let inData = false;
      inData =
        dataShow?.filter(
          (dataProd) => dataProd?.id === prod?.id && dataProd?.size === prod?.size
        ).length === 0;
      if (inData) {
        dataShow?.push(prod);
      }
    });
  };
  calculateContent();

  dataShow?.map((dataColumn) => {
    stock?.push(StockQuery(dataColumn, cart));
    product_name?.push(StockQuery(dataColumn, cart,"name"));
    if (dataColumn?.type === "PROMOTION") {
      product_id?.push(StockQuery(dataColumn, cart, "product_id"))
      if (promo_id?.filter((dataProd) => dataProd?.id === dataColumn?.id)?.length === 0) {
        promo_id?.push(dataColumn?.id)
        limit?.push(StockQuery(dataColumn, cart, "limit") - cart?.filter((dataProd) => dataProd?.id === dataColumn?.id)?.length)
      }
    } else {
      product_id?.push(dataColumn?.id)
    }
  });
  // dataShow?.map((main, mainIndex) => {
  //   dataShow.filter((second, secondIndex) => main.id === second.id).map((resultData, resultIndex) => {
  //     stock.map((stockData, index) => {
  //       if (stock[mainIndex][index].stock > stock[resultIndex][index].stock) {

  //       }
  //     })
  //   })
  // })
  let j = 0;
  console.log("Data Show", dataShow)
  dataShow?.map((dataColumn, index) => {
    let i = 0;
    dataShow?.map((data) => {
      if (data.id === dataColumn.id) {
        for (let index = 0; index < stock[i]?.length ?? 0; index++) {
          if (stock[i][index]?.stock > stock[j][index]?.stock) {
            let item = { ...stock[i][index] }
            item.stock = stock[j][index]?.stock;
            stock[i][index] = item
            // stock[i][index].stock = stock[j][index].stock
          }
        }
      }
      i++
    })
    j++;
  });

  return (
    <div className="flex flex-wrap">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mt-6">
        <CardPayment />
      </div>
      <div className="w-full xl:w-4/12 px-4">
        <CardSum setShowLoading={showLoading} type="Payment" newOrder={newOrder} stock={stock} product_id={product_id} promo_id={promo_id} limit={limit} product_name={product_name} />
      </div>
    </div>
  );
}

export default CustomerPayment;
