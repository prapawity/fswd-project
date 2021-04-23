import { PencilIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";

const CardOrderAdminRow = (props) => {
  const dataOfColumn = props.dataColumn ?? [];
  const history = useHistory();
  const detail = dataOfColumn?._id ?? {};
  const redirectToOrderDetail = useCallback(() => {
    history.push(`/admin/order-detail/${detail}`);
  }, [history]);

  return (
    <tr>
      {/* Order number */}
      <th
        key={dataOfColumn?._id ?? "0"}
        className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left`}
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
      {/* Username */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
        {dataOfColumn?.user?.username ?? "USERNAME"}
      </td>
      {/* Name Surname */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
        {dataOfColumn?.user?.name_surname ?? "USERNAME"}
      </td>
      {/* Total */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
        {dataOfColumn?.total ?? "TOTAL"}
      </td>
      {/* Quantity */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
        {dataOfColumn?.productsID?.length ?? 0}
      </td>
      {/* Address */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
        {dataOfColumn?.address ?? "ADDRESS"}
      </td>
      {/* Status */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
        {dataOfColumn?.status ?? "STATUS"}
      </td>
      {/* Button */}
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-center">
      <div className="flex items-center ">
        <button
          className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
          type="button"
          onClick={redirectToOrderDetail}
        >
          <div className="flex flex-wrap justify-center">
            <PencilIcon className="text-white-600 h-4 w-4 mr-1" />
            Manage
          </div>
        </button>
      </div>
      </td>
    </tr>
  );
};
export default CardOrderAdminRow;
