import { useQuery } from "@apollo/client";
import { Fragment, useCallback, useEffect } from "react";
import { useSession } from "../../contexts/SessionContext";
import { PRODUCTS_QUERY } from "../../graphql/productQuery";
import { PROMOTIONS_QUERY } from "../../graphql/promotionQuery";
import { useHistory } from "react-router-dom";

const StockPage = (props) => {
  const { setLoading } = useSession();
  const history = useHistory();
  const { loading: productLoadgin, data: productData } = useQuery(
    PRODUCTS_QUERY
  );
  const { loading: promotionLoadgin, data: promotionData } = useQuery(
    PROMOTIONS_QUERY
  );

  useEffect(() => {
    if (productLoadgin || promotionLoadgin) {
      setLoading(true);
    } else if (!productLoadgin && !promotionLoadgin) {
      setLoading(false);
    }
  }, [productLoadgin, promotionLoadgin]);

  const redirectToEditProduct = useCallback(
    (id) => {
      history.push(`/admin/products/edit/${id}`);
    },
    [history]
  );

  const redirectToEditPromotion = useCallback(
    (id) => {
      history.push(`/admin/promotion/${id}`);
    },
    [history]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full w-full px-2 md:px-5 mt-0 md:mt-5">
      <div>
        <h3 className={"font-semibold text-2xl text-gray-700 text-center"}>
          Stock Products
        </h3>
        <hr className="my-2" />
        <div className="grid grid-cols-1 gap-2">
          <div className="grid grid-cols-2 gap-2 px-4 py-4 text-center shadow-lg">
            <h3 className="font-semibold text-xl my-auto">Product</h3>
            <div className="grid grid-cols-1 text-center">
              <h3 className="font-semibold text-md">Stock</h3>
              <div className="grid grid-cols-2 text-center">
                <h3 className="text-sm text-gray-700 text-center">size</h3>
                <h3 className="text-sm text-gray-700 text-center">limit</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 py-4">
            {productData?.products?.map((product, index) => (
              <div
                className="grid grid-cols-1 gap-2 px-4 py-4 rounded shadow-md"
                key={product?._id ?? index}
              >
                <div className="grid grid-cols-2 gap-2">
                  <th
                    className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center`}
                  >
                    <img
                      src={product?.thumpnail ?? ""}
                      className="h-24 w-18 bg-white rounded border"
                      alt="..."
                    ></img>
                    <p className={"ml-2 font-bold text-gray-600 text-lg"}>
                      {product?.name ?? ""}
                    </p>
                  </th>
                  <table className="table-auto text-center w-full">
                    <tbody>
                      {product?.size?.map((size) => {
                        return (
                          <tr key={size?.size_number ?? 0}>
                            <td className="p-0">
                              <input
                                type="number"
                                disabled={true}
                                value={size?.size_number ?? ""}
                                className="border-0 text-center py-3 mt-2 placeholder-gray-400 text-gray-700 bg-white rounded text-smfocus:outline-none focus:ring w-full"
                                style={{ transition: "all .15s ease" }}
                              />
                            </td>
                            <td className="p-0">
                              <input
                                type="number"
                                name={size?.size_number ?? ""}
                                value={size?.stock ?? ""}
                                disabled={true}
                                className="border-0 text-center py-3 mt-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm focus:outline-none focus:ring w-full"
                                style={{ transition: "all .15s ease" }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <hr className="my-2" />
                <div className="w-full">
                  <div
                    style={{ margin: "auto", width: "40%" }}
                  >
                    <button
                      onClick={() => redirectToEditProduct(product?._id ?? 0)}
                      style={{ margin: "auto", width: "100%" }}
                      className="bg-gray-600 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Edit Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <h3 className={"font-semibold text-2xl text-gray-700 text-center "}>
          Stock Promotions
        </h3>
        <hr className="my-2" />
        <div className="grid grid-cols-1 gap-2 px-4 py-4 shadow-md bg-gray-200">
          <table className="table-auto text-left w-full">
            <thead>
              <tr className="">
                <th>Promotion</th>
                <th >Product</th>
                <th className="text-center">Discount(%)</th>
                <th className="text-center">Stock Limit</th>
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {promotionData?.promotions?.map((promotion, index) => (
                <tr key={promotion?._id ?? index}>
                  <td className="pr-5">{promotion?.name ?? "name"}</td>
                  <td>{promotion?.productDetail?.name ?? "prod name"}</td>
                  <td className="text-center">{promotion?.discount ?? 0}</td>
                  <td className="text-center">{promotion?.limit ?? 0}</td>
                  <td>
                    <div className="w-full my-5">
                      <button
                        onClick={() =>
                          redirectToEditPromotion(promotion?._id ?? 0)
                        }
                        style={{ margin: "auto", width: "100%" }}
                        className="text-black active:bg-gray-500 bg-gray-500 text-white font-semiBold uppercase text-sm px-1 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Edit Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockPage;
