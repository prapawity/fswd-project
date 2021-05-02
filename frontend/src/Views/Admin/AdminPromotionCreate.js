import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROMOTION } from "../../graphql/promotionMutation";
import { PRODUCTS_QUERY } from "../../graphql/productQuery";
import { PROMOTIONS_QUERY } from "../../graphql/promotionQuery";
import { useToasts } from 'react-toast-notifications'
import LoadingScreen from "../../Components/General/LoadingScreen";

const AdminPromotionCreate = (props) => {
  const history = useHistory();
  const { loading, data, error } = useQuery(PRODUCTS_QUERY);
  const { addToast } = useToasts()
  const [showLoading, setLoading] = useState(false)
  const [newPromotion, setPromotion] = useState({
    productID: data?.products[0]?._id ?? "",
    price: "",
    name: "",
    discount: 1,
    limit: 1,
    thumpnail: "https://www.gefu.com/media/image/4e/c0/1e/xPromotion-1000x562.jpg.pagespeed.ic.EI2ZcixaFi.webp"
  });

  const refetchQuery = {
    refetchQueries: [
      {
        query: PROMOTIONS_QUERY,
        variables: { name: newPromotion.productName },
      },
    ],
  };
  const [create_promotion] = useMutation(CREATE_PROMOTION, refetchQuery);
  const redirectToPromotions = useCallback(() => {
    history.push("/admin/promotions");

  }, [history]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name == "discount" || name == "limit") {
      setPromotion((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setPromotion((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleCreate = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true)
      const promo = newPromotion
      promo.productID = data?.products[0]?._id ?? ""
      promo.price = (data?.products?.filter((prod) => prod?._id === newPromotion?.productID)[0]?.price ?? 0).toString()

      setTimeout(async () => {
        try {
          await create_promotion({ variables: { record: promo } });
          addToast(`Create Promotion ${newPromotion.name}`, { appearance: 'success', autoDismiss: true });
          setLoading(false)
          redirectToPromotions();

        } catch (err) {
          setLoading(false)
          console.log(err);
          alert("Product name query failed");
        }
      }, 1000);
    },
    [newPromotion]
  );

  useEffect(() => {
    if (loading && data) {
      setLoading(true)
    } else if (!loading || error) {
      setLoading(false)
    }
  }, [data, loading])

  return (
    <section className="section-login" style={{ position: 'relative' }}>
      <LoadingScreen show={showLoading} />
      <div
        className="w-full h-full bg-login"
        style={{
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          position: "absolute",
        }}
      ></div>
      <div className="container mx-auto px-4 h-full mt-10">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0" style={{ margin: 'auto' }}>
              <div className="flex-auto px-4 lg:px-10 py-10">
                <div className="relative w-full mb-3 ">
                  <h3 className="block font-semibold uppercase text-xl text-gray-700">
                    Create promotion
                  </h3>
                </div>
                <form onSubmit={handleCreate}>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      promo name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      name="name"
                      value={newPromotion.name}
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
                      {data?.products?.map((product, index) => <option value={product?._id ?? index} key={product?._id ?? index}>{product?.name ?? "NAME"}, {parseFloat(product?.price ?? 0).toLocaleString('th-TH', {
                        style: 'currency',
                        currency: 'THB'
                      })}</option>)}
                    </select>
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      discount: {newPromotion.discount} %
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      name="discount"
                      value={newPromotion.discount}
                      placeholder="percent discount"
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
                      value={newPromotion.limit}
                      placeholder="limit number"
                      onChange={handleInputChange}
                      min="1"
                      style={{ transition: "all .15s ease" }}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-green-700 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      Create
                    </button>
                  </div>
                </form>
                <div className="text-center mt-2">
                  <button
                    onClick={redirectToPromotions}
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    style={{ transition: "all .15s ease" }}
                  >
                    cancel
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

export default AdminPromotionCreate;
