import { useCallback } from "react"
import { useHistory } from "react-router"
import { TrashIcon, PencilIcon } from "@heroicons/react/solid"
import { DELETE_PRODUCT } from "../../graphql/productMutation";
import { useMutation, useQuery } from "@apollo/client";
import { useToasts } from 'react-toast-notifications'

const newLabelStyle = {
  color: "rgb(250, 84, 0)",
  fontSize: "14px",
};

const productTypeTextStyle = {
  color: "rgb(117, 117, 117)",
  fontSize: "14px",
};

const productNameTextStyle = {
  fontSize: "18px",
};

const imageStyle = {
  borderRadius: "5px",
};


const CardProductAdmin = (props) => {
  const { addToast } = useToasts()
  const history = useHistory();
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const image =
    (props?.img ?? "") === ""
      ? "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c6081451-e5e6-44a2-a4f4-21558717782f/%E0%B8%A3%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%9C%E0%B8%B9%E0%B9%89-classic-cortez-GdrCtp.png"
      : props.img;
  const detail = props?.detail ?? {}
  const id = detail._id ?? ""
  const redirectToEditProduct = useCallback(() => {
    history.push(`/admin/products/edit/${detail._id}`);
  }, [history]);

  const removeProduct = async () => {
    try {
      await deleteProduct({ variables: { id } })
      addToast(`DELETE Success`, { appearance: 'error', autoDismiss: true })
      props?.reloadData()
    } catch (error) {
      console.log(error)
      alert("DELETE FAIL")
    }
  }

  return (
    <div className="relative shadow-md p-5">
      <img className="mb-5" src={image} style={imageStyle} />
      <p style={newLabelStyle}>New Arrival</p>
      <p style={productNameTextStyle}>{detail.name}</p>
      <p style={productTypeTextStyle}>{detail.category}</p>
      <p>
        {parseInt(detail.price).toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        }) ?? ""}
      </p>
      <div className="absolute bottom-0 right-0 p-4">
        <button
          className="bg-gray-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
          type="button"
          onClick={redirectToEditProduct}
        >
          <div className="flex flex-wrap justify-center">
            <PencilIcon className="text-white-600 h-4 w-4 mr-1" />
              Edit
            </div>
        </button>
        <button
          className="bg-red-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150 ml-1"
          type="button"
          onClick={removeProduct}
        >
          <div className="flex flex-wrap justify-center">
            <TrashIcon className="text-white-600 h-4 w-4 mr-1" />
              Delete
            </div>
        </button>

      </div>
    </div>
  );
};

export default CardProductAdmin;
