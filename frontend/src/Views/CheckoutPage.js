import { useQuery } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import CardCart from "../Components/CardCart";
import CartTotal from "../Components/CartTotal";
import CardSum from "../Components/Payment/CardSum";
import { useSession } from "../contexts/SessionContext";
import { USER_QUERY } from "../graphql/userQuery";

const Checkout = (props) => {
  const customerHeader = ["Product", "Details", "Size", "Price", "Quantity"];
  const { cart, userCookies, setLoading } = useSession();
  const { loading, data, error } = useQuery(USER_QUERY, {
    variables: { id: userCookies._id },
  });

  let total = 0;
  let subtotal = 0;
  let list = [];
  if (cart !== undefined) {
    cart.map((dataColumn) => (subtotal += CartTotal(dataColumn, "subtotal")));
    cart.map((dataColumn) => (total += CartTotal(dataColumn, "total")));
  }

  cart?.map((data) => list.push({ id: data.id, size: data.size }));
  const [newOrder, setOrder] = useState(null);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    if (loading && data) {
      setLoading(true);
    } else if (!loading || error) {
      if (newOrder === null) {
        setOrder({
          total: total,
          subtotal: subtotal,
          userID: userCookies?._id,
          productsID: list,
          shippingFee: 0,
          address: data?.customerById?.address ?? "",
        });
      }
      setLoading(false);
    }
  }, [loading]);

  return (
    <>
      <div className="mb-12 xl:mb-0 px-4 mt-6">
        <h3 className={"font-semibold text-2xl text-gray-700 text-center"}>
          CheckOut
        </h3>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mt-6">
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-gray-600"
            }
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className={"font-semibold text-lg text-gray-700"}>
                    Address
                  </h3>
                </div>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                  name="address"
                  value={newOrder?.address ?? "address"}
                  placeholder="enter address here"
                  onChange={handleInputChange}
                  style={{ transition: "all .15s ease" }}
                />
              </div>
            </div>
          </div>
          <CardCart
            head={customerHeader}
          ></CardCart>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSum type="Checkout" newOrder={newOrder} />
        </div>
      </div>
    </>
  );
};
export default Checkout;
