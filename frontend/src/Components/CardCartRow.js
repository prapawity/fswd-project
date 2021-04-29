import { useQuery } from "@apollo/client";
import { PRODUCT_QUERY } from "../graphql/productQuery";
import { TrashIcon } from "@heroicons/react/solid";
import { PROMOTION_QUERY } from "../graphql/promotionQuery"
import { useCallback, useState } from "react";
import { useSession } from "../contexts/SessionContext";
const CardCartRow = (props) => {
  const { setCart } = useSession()
  const [list, setList] = useState(props?.all ?? []);
  const { loading, data } = useQuery(props?.dataColumn?.type === "PRODUCT" ? PRODUCT_QUERY : PROMOTION_QUERY, {
    variables: { id: props?.dataColumn?.id ?? "" },
  })

  // console.log(props?.dataColumn)

  const handleDelete = useCallback((e) => {
    e.preventDefault();
    const newList = list.filter((item) => !(item?.id === props?.dataColumn?.id && item?.size === props?.dataColumn?.size))
    setCart(newList)
  }, [])

  return (
    <tr>
      <th
        className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center`}
      >
        <img
          src={
            data?.promotionByID?.productDetail?.thumpnail ??
            data?.promotionByID?.thumpnail ?? data?.productByID?.thumpnail ??
            process.env.PUBLIC_URL + "/img/shoes/run3.jpeg"
          }
          className="h-12 w-12 bg-white rounded-full border"
          alt="..."
        ></img>{" "}
        <span className={"ml-3 font-bold text-blueGray-600"}>
          {data?.productByID?.name ??
            data?.promotionByID?.productDetail?.name ??
            "Name"}
        </span>
      </th>
      {/* Detail */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
        {data?.productByID?.description ??
          data?.promotionByID?.productDetail?.description ??
          "Details"}
      </td>
      {/* Size */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
        {props?.dataColumn?.size}
      </td>
      {/* Price */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
        {data?.promotionByID?.productDetail?.price !== undefined ? (
          <div className="line-through">
            {parseFloat(
              data?.promotionByID?.productDetail?.price
            ).toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            })}
          </div>
        ) : null}
        {parseFloat(
          data?.productByID?.price ?? data?.promotionByID?.totalPrice
        ).toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        })}
      </td>
      {/* Quantity */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
        {
          props?.all?.filter(
            (prod) =>
              prod?.id === props?.dataColumn?.id &&
              prod?.size === props?.dataColumn?.size
          )?.length ?? 0
        }
      </td>

      {props?.type === "Cart" ? (
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
