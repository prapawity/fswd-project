import { Fragment, useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_PROMOTION,
  DELETE_PROMOTION,
} from "../../graphql/promotionMutation";
import { PRODUCTS_QUERY } from "../../graphql/productQuery";
import { PROMOTION_QUERY, PROMOTIONS_QUERY } from "../../graphql/promotionQuery";
import { useSession } from "../../contexts/SessionContext";

const AdminPromotionEdit = (props) => {
  const history = useHistory();
  const { setLoading } = useSession()
  const id = props?.match?.params?.id ?? 0
  const { loading, data } = useQuery(PROMOTION_QUERY, {
    variables: { id: id },
    fetchPolicy: 'no-cache'
  });
  const { loading: loading3, data: test } = useQuery(PRODUCTS_QUERY);
  const refetchQuery = {
    refetchQueries: [{
      query: PROMOTIONS_QUERY
    }]
  }

  const [newPromotion, setPromotion] = useState(null);
  const [update_promotion] = useMutation(UPDATE_PROMOTION, refetchQuery);
  const [delete_promotion] = useMutation(DELETE_PROMOTION, refetchQuery);
  const redirectToPromotions = useCallback(() => {
    history.goBack()
  }, [history]);


  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name == "discount" || name == "limit") {
      setPromotion((prev) => ({ ...prev, [name]: parseFloat(value) }));

    } else if (name === "productName") {
      setPromotion((prev) => ({ ...prev, [name]: value }));
    }
    else {
      setPromotion((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleDelete = useCallback(async (e) => {
    e.preventDefault();
    try {
      await delete_promotion({ variables: { id: id } });
      redirectToPromotions();

    } catch (err) {
      console.log(err);
      alert("Delete promo failed");
    }
  }, []);

  const handleEdit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true)
        try {
          await update_promotion({
            variables: {
              id: id,
              name: newPromotion?.name ?? "promo",
              price: newPromotion?.price ?? "0",
              discount: newPromotion?.discount ?? 0,
              limit: newPromotion?.limit ?? 0,
              productID: newPromotion?.productID ?? "0",
            },
          });
          setLoading(false)
          redirectToPromotions();
        } catch (err) {
          console.log(err);
          setLoading(false);
          alert("create promo failed");
        }
    },
    [newPromotion]
  );

  useEffect(() => {
    if (!loading || data) {
      if (data && newPromotion === null) {
        setPromotion(data.promotionByID);
      }
    }
  }, [data]);
  return (
    <section className="section-login">
      <div
        className="w-full h-full bg-login"
        style={{
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          position: "inherit",
        }}
      ></div>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="flex-auto px-4 lg:px-10 py-4">
                <div className="relative w-full mb-2">
                  <h5 className="block font-semibold uppercase text-xl text-gray-700">
                    Edit promotion
                </h5>
                </div>
                {newPromotion ? (<form onSubmit={handleEdit}>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      promo name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      name="name"
                      value={newPromotion?.name ?? "name"}
                      placeholder="promotion name"
                      onChange={handleInputChange}
                      style={{ transition: "all .15s ease" }}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      product name
                    </label>
                    <select name="productID" value={newPromotion.productID} required={true} onChange={handleInputChange} className="border p-2 rounded w-full">
                      {test?.products?.map((product, index) => <option value={product?._id ?? index} key={product?._id ?? index}>{product?.name ?? "NAME"}, {parseFloat(product?.price ?? 0).toLocaleString('th-TH', {
                        style: 'currency',
                        currency: 'THB'
                      })}</option>)}
                    </select>
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      discount
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      name="discount"
                      value={newPromotion?.discount ?? 0}
                      placeholder="discount"
                      onChange={handleInputChange}
                      min="1"
                      max="100"
                      style={{ transition: "all .15s ease" }}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      limit
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      name="limit"
                      value={newPromotion?.limit ?? 0}
                      min="1"
                      placeholder="limit"
                      onChange={handleInputChange}
                      style={{ transition: "all .15s ease" }}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-green-700 text-white active:bg-blue-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      Save
                    </button>
                  </div>
                </form>) : (<Fragment></Fragment>)}
                <div className="text-center mt-2">
                  <button
                    onClick={redirectToPromotions}
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    style={{ transition: "all .15s ease" }}
                  >
                    cancel
                  </button>
                </div>
                <div className="text-center mt-2">
                  <button
                    onClick={handleDelete}
                    className="bg-red-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    style={{ transition: "all .15s ease" }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPromotionEdit;
