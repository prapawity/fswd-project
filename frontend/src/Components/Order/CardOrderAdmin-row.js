import { useHistory } from "react-router-dom"
import { useCallback } from "react"
import { useMutation, useQuery } from '@apollo/client'
import { REMOVE_ORDER } from "../../graphql/orderQuery"
import { useToasts } from 'react-toast-notifications'
import { UPDATE_STOCK } from "../../graphql/productMutation"
import { PRODUCTS_QUERY } from "../../graphql/productQuery"

const CardOrderAdminRow = (props) => {
  const dataOfColumn = props.dataColumn ?? [];
  const history = useHistory();
  const detail = dataOfColumn?._id ?? "";
  const { addToast } = useToasts()
  const [removeOrder] = useMutation(REMOVE_ORDER)
  const [updateProduct] = useMutation(UPDATE_STOCK)
  const { data } = useQuery(PRODUCTS_QUERY)

  const redirectToOrderDetail = useCallback(() => {
    history.push(`/admin/order-detail/${detail}`);
  }, [history]);

  const updateProductData = async () => {
    dataOfColumn?.productsID?.map(async (productSize) => {
      const filteredData = data?.products?.filter((product) => product?._id === productSize?.id)
      if (filteredData?.length > 0) {
        console.log(filteredData)
        const newSize = filteredData[0]?.size ?? []

        const result = newSize.map((size) => {
          if (size?.size_number === productSize?.size) {

            return { size_number: size?.size_number, stock: size?.stock + 1 }
          }
          return size
        })

        if (result?.length > 0) {
          try {
            await updateProduct({ variables: { id: filteredData[0]?._id ?? 0, size: result } })
            console.log("UPDATE PRODUCT SUCCESS", result, newSize)
          } catch (error) {
            console.log(error)
            alert("UPDATE PRODUCT ERROR")
          }
        }
      }
    })
  }

  const handleRemoveOrder = async () => {
    console.log(detail)
    props?.setLoading(true)
    
    try {
      await updateProductData()
      await removeOrder({ variables: { id: detail } })
      props?.setLoading(false)
      props?.refetch()
      addToast(`Remove Order Success`, { appearance: 'error', autoDismiss: true });
    } catch (error) {
      props?.setLoading(false)
      console.log(error)
      alert("Remove order fail")
    }
  }

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
        {dataOfColumn?.address?.substr(0, 40) ?? "ADDRESS"}
      </td>
      {/* Status */}
      <td className="pr-4">
        <div className={`bg-${(dataOfColumn?.status ?? "INPROCESS") === "INPROCESS" ? "yellow" : "green"}-500 active:bg-gray-600 uppercase text-white font-bold shadow text-xs px-3 py-2 rounded text-center`}>
          {dataOfColumn?.status ?? "STATUS"}
        </div>
      </td>
      {/* Button */}
      <td className="border-t-0 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 px-0 pr-1 text-left">
        <div className="flex items-center ">
          <button
            className="bg-gray-500 w-full active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
            type="button"
            onClick={redirectToOrderDetail}
          >
            <div className="flex flex-wrap justify-center">
              Manage
          </div>
          </button>
        </div>
      </td>
      <td className="border-t-0 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 px-0  text-center">
        <div className="flex items-center ">
          <button
            className="bg-red-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none text-center ease-linear transition-all duration-150"
            type="button"
            onClick={handleRemoveOrder}
          >
            <div className="justify-center w-full">
              Delete
          </div>
          </button>
        </div>
      </td>
    </tr>
  );
};
export default CardOrderAdminRow;
