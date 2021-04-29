import { TrashIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { useQuery } from '@apollo/client'
import { PROMOTIONS_QUERY } from "../../graphql/promotionQuery";
const CardOrderDetailAdmRow = (props) => {
  const dataOfColumn = props?.dataColumn ?? {};
  const { data } = useQuery(PROMOTIONS_QUERY)
  let dataShow = [];

  const calculateContent = async () => {
    dataShow = []
    dataOfColumn?.productsID?.map((prod) => {
      let inData = false;
      inData =
        dataShow?.filter(
          (dataProd) => dataProd.id === prod.id && dataProd.size === prod.size
        ).length === 0
      console.log("CHECK DATA Show", dataShow, inData, (dataOfColumn?.products?.filter((product) => prod?.id === product?._id).length === 1), dataOfColumn.products, prod.id)
      if (inData) {
        dataShow.push(prod);
      }
    });
  };

  calculateContent();
  console.log(dataShow, dataOfColumn)
  const deleteData = (id) => {
    props?.deleteProduct(id)
  }

  return (
    <Fragment>
      {dataShow.map((product, productIndex) => {
        const productDetail = dataOfColumn?.products.filter((prod) => prod?._id === product?.id)[0]
        console.log(product)
        return (
          <tr key={productIndex}>
            {/* Product */}
            <th
              className={`border-t-0 px-8 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left flex items-center`}
            >
              <img
                src={
                  productDetail?.thumpnail ??
                  (data?.promotions?.filter((promo) => promo?._id === productDetail?._id)[0]?.productDetail?.thumpnail ?? process.env.PUBLIC_URL + "/img/shoes/run3.jpeg")
                }
                className="h-12 w-12 bg-white rounded-full border"
                alt="..."
              ></img>{" "}
              <span className={"ml-3 font-bold text-blueGray-600"}>
                {productDetail?.type === "PRODUCT" ? productDetail?.name ?? "Name" : (data?.promotions?.filter((promo) => promo?._id === productDetail?._id)[0]?.productDetail?.name ?? "Name")}
              </span>
            </th>
            {/* Detail */}
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left">
              {productDetail?.type === "PROMOTION" ? `Promotion: ${(data?.promotions?.filter((promo) => promo?._id === productDetail?._id)[0]?.name ?? "Name")}` : (productDetail?.description ?? "Details")}
            </td>
            {/* Size */}
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
              {product.size}
            </td>
            {/* Price */}
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
              {parseFloat(
                dataOfColumn?.products?.filter(
                  (prod) => prod?._id === product?.id
                )[0]?.price
              ).toLocaleString("th-TH", {
                style: "currency",
                currency: "THB",
              })}
            </td>
            {/* Quantity */}
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left">
              {
                dataOfColumn?.productsID?.filter(
                  (prod) => prod.id === product.id && prod.size === product.size
                )?.length
              }
            </td>
            {/* Button */}
            <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 text-normal whitespace-nowrap p-4 text-left ">
              <div className="flex flex-wrap justify-center">
                <div className="ml-2 flex items-center h-full">
                  <button
                    className="bg-red-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-3 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deleteData(product)}
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
      })}
    </Fragment>
  );
};
export default CardOrderDetailAdmRow;
