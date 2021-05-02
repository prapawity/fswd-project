import { Fragment, useEffect } from "react";
import { useSession } from "../../contexts/SessionContext";
import { useQuery } from "@apollo/client";
import { PROMOTIONS_QUERY } from "../../graphql/promotionQuery";

const CardOrderDetailPdt = (props) => {
  const { setLoading } = useSession();
  const { loading, data } = useQuery(PROMOTIONS_QUERY);
  const dataOfColumn = props?.dataColumn ?? {};

  useEffect(() => {

  }, [data, loading])
  const description = (product) => {
    const desc = dataOfColumn?.products?.filter(
      (prod) => prod?._id === product?.id
    )
    return desc[0]?.type === "PROMOTION" ? "Promotion" : desc[0]?.description ?? ""

  };
  const price = (product) => {
    const promoList = data?.promotions?.filter(
      (promo) => promo?._id === product?.id
    )
    if (promoList?.length > 0) {
      return parseFloat(promoList[0]?.totalPrice).toLocaleString("th-TH", {
        style: "currency",
        currency: "THB",
      })
    } else {
      const desc = dataOfColumn?.products?.filter(
        (prod) => prod?._id === product?.id
      );
      return parseFloat(desc[0]?.price).toLocaleString("th-TH", {
        style: "currency",
        currency: "THB",
      })
    }
  };
  let dataShow = [];
  const calculateContent = () => {
    dataShow = [];

    dataOfColumn?.productsID?.map((prod) => {
      let inData = false;
      inData =
        dataShow?.filter(
          (dataProd) =>
            dataProd?.id === prod?.id && dataProd?.size === prod?.size
        ).length === 0;
      if (inData) {
        dataShow.push(prod);
      }
    });
  };

  calculateContent();
  return (
    <Fragment>
      {dataShow.map((product, productIndex) => {
        if (
          dataOfColumn?.products?.filter((prod) => prod?._id === product?.id)
            .length === 0
        ) {
          return <Fragment></Fragment>;
        }
        return (
          <tr key={productIndex}>
            {/* Product */}
            <th
              className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center`}
            >
              <img
                src={
                  dataOfColumn?.products?.filter(
                    (prod) => prod?._id === product?.id
                  )[0]?.thumpnail ??
                  process.env.PUBLIC_URL + "/img/shoes/run3.jpeg"
                }
                className="h-12 w-12 bg-white rounded-full border"
                alt="..."
              ></img>{" "}
              <span className={"ml-3 font-bold text-blueGray-600"}>
                {dataOfColumn?.products?.filter(
                  (prod) => prod?._id === product?.id
                )[0]?.name ?? "Name"}
              </span>
            </th>
            {/* Detail */}
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
              {description(product)}
            </td>
            {/* Size */}
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
              {product.size}
            </td>
            {/* Price */}
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center ">
              {price(product)}
            </td>
            {/* Quantity */}
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
              {
                dataOfColumn?.productsID?.filter(
                  (prod) =>
                    prod?.id === product?.id && prod?.size === product?.size
                ).length
              }
            </td>
          </tr>
        );
      })}
    </Fragment>
  );
};

export default CardOrderDetailPdt;
