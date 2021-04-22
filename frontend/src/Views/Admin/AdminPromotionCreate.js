import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROMOTION } from "../../graphql/promotionMutation";
import { PRODUCT_FILTER_QUERY } from "../../graphql/productQuery";
import { PROMOTIONS_QUERY } from "../../graphql/promotionQuery";

const AdminPromotionCreate = (props) => {
  const history = useHistory();
  const [newPromotion, setPromotion] = useState({
    productName: "",
    productID: "",
    price: "",
    name: "",
    discount: null,
    limit: null,
  });
  const { data: refetch } = useQuery(PROMOTIONS_QUERY);
  const refetchQuery = {
    refetchQueries: [
      {
        query: PROMOTIONS_QUERY,
        variables: { name: newPromotion.productName },
      },
    ],
  };
  const [create_promotion] = useMutation(CREATE_PROMOTION, refetchQuery);
  const query = useQuery(PRODUCT_FILTER_QUERY, {
    variables: { name: newPromotion.productName },
  });
  const redirectToPromotions = useCallback(() => {
    history.push("/admin/promotions");
    // window.location.reload();
  }, [history]);
  // console.log(props)
  console.log(newPromotion);
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
      try {
        newPromotion.price = (
          (parseFloat(query.data.product.price) *
            (100 - newPromotion.discount)) /
          100
        ).toString();
        newPromotion.productID = query?.data?.product?._id;
        try {
          delete newPromotion.productName;
          console.log(newPromotion);
          await create_promotion({ variables: { record: newPromotion } });
          redirectToPromotions();
        } catch (err) {
          newPromotion.productName = query.data.product.name;
          console.log(err);
          alert("create promo failed");
        }
      } catch (err) {
        console.log(err);
        alert("Product name query failed");
      }
    },
    [newPromotion]
  );
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
              <div className="flex-auto px-4 lg:px-10 py-10">
                <div className="relative w-full mb-3 ">
                  <h3 className="block font-semibold uppercase text-lg text-gray-700">
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
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      name="productName"
                      value={newPromotion.productName}
                      placeholder="product name"
                      onChange={handleInputChange}
                      style={{ transition: "all .15s ease" }}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      discount
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      name="discount"
                      value={newPromotion.discount}
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
                      value={newPromotion.limit}
                      placeholder="limit"
                      onChange={handleInputChange}
                      min="1"
                      style={{ transition: "all .15s ease" }}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-green-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                      type="submit"
                      style={{ transition: "all .15s ease" }}
                    >
                      Create
                    </button>
                  </div>
                </form>
                <div className="text-center mt-6">
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
