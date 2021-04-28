import { useSession } from "../contexts/SessionContext";
import CardCart from "../Components/CardCart";
import CardSum from "../Components/Payment/CardSum";
import CartTotal from "../Components/CartTotal";
const CartPage = (props) => {
  const { cart, userCookies, setCart } = useSession();
  const customerHeader = [
    "Product",
    "Details",
    "Size",
    "Price",
    "Quantity",
    "",
  ];
  let total = 0;
  let subtotal = 0;
  if (cart !== undefined) {
    cart.map((dataColumn) => (subtotal += CartTotal(dataColumn, "subtotal")));
    cart.map((dataColumn) => (total += CartTotal(dataColumn, "total")));
  }
  const newOrder = {
    total: total,
    subtotal: subtotal,
    userID: userCookies?._id,
    productsID: [],
    shippingFee: 0,
    address: "",
  };
  cart?.map((data) =>
    newOrder?.productsID.push({ id: data.id, size: data.size })
  );
  // console.log(newOrder)
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mt-6">
          <CardCart
            type="Cart"
            cart={cart}
            head={customerHeader}
            userCookies={userCookies}
            setCart={setCart}
          ></CardCart>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardTotal orderDetail={data?.orderById ?? {}} /> */}
          <CardSum type="Cart" newOrder={newOrder} />
        </div>
      </div>
    </>
  );
};
export default CartPage;
