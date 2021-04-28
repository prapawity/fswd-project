import { useQuery, useMutation } from "@apollo/client";
import { useCallback } from "react";
import CardCartRow from "../Components/CardCartRow";
import CartTotal from "../Components/CartTotal";
import { CREATE_ORDER } from "../graphql/orderMutation";
import {UPDATE_PRODUCT} from "../graphql/productMutation";
import { PRODUCT_QUERTY } from "../graphql/productQuery";
import { PROMOTION_QUERY } from "../graphql/promotionQuery";
const CardCart = (props) => {
  const cart = props?.cart;
  const dataOfColumn = cart ?? null;
  let dataShow = [];
  const calculateContent = () => {
    dataShow = [];
    // console.log(dataOfColumn);
    dataOfColumn?.map((prod) => {
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
              <h3 className={"font-semibold text-lg text-gray-700"}>Cart</h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {props.head.map((head) => {
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
              {dataShow.map((prod) => (
                <CardCartRow type={props.type} dataColumn={prod} all={dataOfColumn}  setCart={props.setCart}/>
              ))}
            </tbody>
          </table>
        </div>
        {/* <button
          className="bg-green-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
          type="button"
            onClick={handleCreateOrder}
        >
          <div className="flex flex-wrap justify-center">next</div>
        </button> */}
      </div>
    </>
  );
};
export default CardCart;
