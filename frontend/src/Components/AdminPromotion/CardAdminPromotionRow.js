import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { PROMOTIONS_QUERY } from "../../graphql/promotionQuery";
import { DELETE_PROMOTION } from "../../graphql/promotionMutation";

const CardAdminPromotionRow = (prop) => {
  const history = useHistory();
  const refetchQuery = {
    refetchQueries: [
      {
        query: PROMOTIONS_QUERY,
      },
    ],
  };

  const [delete_promotion] = useMutation(DELETE_PROMOTION, refetchQuery);
  // console.log(prop)
  const redirectToPromotion = useCallback(() => {
    history.push("/admin/promotion/" + prop.data._id);
  }, [history]);
  const handleDelete = useCallback(async (e) => {
    e.preventDefault();
    try {
      await delete_promotion({ variables: { id: prop.data._id } });
      // window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Delete promo failed");
    }
  }, []);
  // console.log(prop?.data)
  return (
    <tr>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left">
        {prop?.data?.name}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left">
        {prop?.data?.productDetail?.name}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left">
        {prop?.data?.productDetail?.price}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left">
        {prop?.data?.totalPrice}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left">
        {prop?.data?.discount} %
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left">
        {prop?.data?.limit}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
        <button
          className="bg-gray-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150 mr-1"
          type="button"
          onClick={redirectToPromotion}
        >
          <div className="flex flex-wrap justify-center ">
            <PencilIcon className="text-white-600 h-4 w-4 mr-1" />
            Edit
          </div>
        </button>
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
    </tr>
  );
};

export default CardAdminPromotionRow;