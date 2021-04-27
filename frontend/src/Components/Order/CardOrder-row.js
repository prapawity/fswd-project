import { EyeIcon, TrashIcon } from "@heroicons/react/solid";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

const CardOrderRow = (props) => {
  const dataOfColumn = props.dataColumn ?? [];
  const history = useHistory();
  const detail = dataOfColumn?._id ?? {};

  const redirectToOrderDetail = useCallback(() => {
    history.push(`/customer/order-detail/${detail}`);
  }, [history]);

  const deleteOrder = () => {
    props?.deleteOrder(detail)
  }
  return (
    <tr>
      {/* Order Number */}
      <th
        key={dataOfColumn?._id ?? "0"}
        className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left flex items-center`}
      >
        <span className={" font-bold text-blueGray-600"}>
          {dataOfColumn?._id ?? "ID"}
        </span>
      </th>
      {/* Date */}
      <td
        key={dataOfColumn?.timestamp ?? "1"}
        className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left "
      >
        {dataOfColumn?.timestamp ?? "TIMESTAMP"}
      </td>
      {/* Quantity */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
        {dataOfColumn?.productsID?.length ?? 0}
      </td>
      {/* Products */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
        {dataOfColumn?.productsID?.map(
          (txt, index) =>
            ((index === 0 || dataOfColumn?.products[index] === null ? "" : ", ") ?? ", ") +
            (dataOfColumn?.products?.filter((element) => (element?._id ?? "") === (txt?.id ?? ""))[0]?.name ?? "")
        )}
      </td>
      {/* Button */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left">
        <div className="grid grid-cols-2">
          <div className="flex items-center ">
            <button
              className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
              type="button"
              onClick={redirectToOrderDetail}
            >
              <div className="flex flex-wrap justify-center">
                <EyeIcon className="text-white-600 h-4 w-4 mr-1" />
              Views
            </div>
            </button>
          </div>
          <div className="flex ">
            <button
              className="bg-red-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
              type="button"
              onClick={deleteOrder}
            >
              <div className="flex flex-wrap justify-center">
                <TrashIcon className="text-white-600 h-4 w-4 mr-1" />
              Delete
            </div>
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};
export default CardOrderRow;
