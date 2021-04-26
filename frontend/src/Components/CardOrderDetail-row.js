import { Fragment } from "react";

const CardOrderDetailPdt = (props) => {
  const dataOfColumn = props?.dataColumn ?? {};
  let dataShow = [] 
  console.log(dataOfColumn, props.dataColumn, "CHK")
  const calculateContent = () => {
    dataShow = []
    console.log(dataOfColumn?.productsID)
    dataOfColumn?.productsID?.map((prod) => {
      let inData = false
      inData = dataShow.filter((dataProd) => (dataProd.id === prod.id && dataProd.size === prod.size)).length === 0
      if (inData) {
        dataShow.push(prod)
      }
    })
  }

  calculateContent()
  return (
    <Fragment>
      {dataShow.map((product, productIndex) => {
        return (
          <tr key={productIndex}>
            {/* Product */}
            <th
              className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center`}
            >
              <img
                src={dataOfColumn?.products?.filter((prod) => (prod?._id === product?.id))[0]?.thumpnail ?? process.env.PUBLIC_URL + "/img/shoes/run3.jpeg"}
                className="h-12 w-12 bg-white rounded-full border"
                alt="..."
              ></img>{" "}
              <span className={"ml-3 font-bold text-blueGray-600"}>{dataOfColumn?.products?.filter((prod) => prod?._id === product?.id)[0]?.name ?? "Name"}</span>
            </th>
            {/* Detail */}
            <td
              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
            >
              {dataOfColumn?.products?.filter((prod) => prod?._id === product?.id)[0]?.description ?? "Details"}
            </td>
            {/* Size */}
            <td
              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center "
            >
              {product.size}
            </td>
            {/* Price */}
            <td
              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center "
            >
              {parseFloat(dataOfColumn?.products?.filter((prod) => prod?._id === product.id)[0]?.price).toLocaleString('th-TH', {
                style: 'currency',
                currency: 'THB'
              })}
            </td>
            {/* Quantity */}
            <td
              className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
            >
              {dataOfColumn?.productsID?.filter((prod) => (prod?.id === product?.id && prod?.size === product?.size)).length}
            </td>
          </tr>
        )
      })}
    </Fragment>



  );
};

export default CardOrderDetailPdt;
