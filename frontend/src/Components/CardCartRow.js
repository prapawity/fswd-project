import { useQuery } from "@apollo/client";
import { PRODUCT_QUERY } from "../graphql/productQuery";
import { TrashIcon } from "@heroicons/react/solid";
import { PROMOTION_QUERY } from "../graphql/promotionQuery"
import { useCallback, useState } from "react";
const CardCartRow = (props) => {
  const [list, setList] = useState(props.all);
  const { loading, data: product } = useQuery(PRODUCT_QUERY, {
    variables: { id: props.dataColumn.id },
  });
  const { loading: loading2, data: promo } = useQuery(PROMOTION_QUERY, {
    variables: { id: props.dataColumn.id },
  });
  // console.log(props.all);
  const handleDelete = useCallback((e) => {
    e.preventDefault();
    const newList = list.filter((item) => !(item.id === props.dataColumn.id && item.size === props.dataColumn.size));
    props.setCart(newList)
  }, []);
  return (
    <tr>
      <th
        className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center`}
      >
        <img
          src={
            product?.productByID?.thumpnail ??
            promo?.promotionByID?.productDetail?.thumpnail ??
            promo?.promotionByID?.thumpnail ??
            process.env.PUBLIC_URL + "/img/shoes/run3.jpeg"
          }
          className="h-12 w-12 bg-white rounded-full border"
          alt="..."
        ></img>{" "}
        <span className={"ml-3 font-bold text-blueGray-600"}>
          {product?.productByID?.name ??
            promo?.promotionByID?.productDetail?.name ??
            "Name"}
        </span>
      </th>
      {/* Detail */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
        {product?.productByID?.description ??
          promo?.promotionByID?.productDetail?.description ??
          "Details"}
      </td>
      {/* Size */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
        {props.dataColumn.size}
      </td>
      {/* Price */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
        {promo?.promotionByID?.productDetail?.price !== undefined ? (
          <div className="line-through">
            {parseFloat(
              promo?.promotionByID?.productDetail?.price
            ).toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            })}
          </div>
        ) : null}
        {parseFloat(
          product?.productByID?.price ?? promo?.promotionByID?.totalPrice
        ).toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        })}
      </td>
      {/* Quantity */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
        {
          props.all.filter(
            (prod) =>
              prod.id === props.dataColumn.id &&
              prod.size === props.dataColumn.size
          ).length
        }
      </td>

      {props.type === "Cart" ? (
        <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap  text-center">
          <button
            className="bg-red-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
            type="button"
            onClick={handleDelete}
          >
            <div className="flex flex-wrap justify-center">
              <TrashIcon className="text-white-600 h-4 w-4 mr-1" />
              Delete
            </div>
          </button>
        </td>
      ) : null}
    </tr>
  );
};

export default CardCartRow;
