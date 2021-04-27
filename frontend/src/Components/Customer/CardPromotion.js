import { useCallback } from "react";
import { useHistory } from "react-router"
const CardPromotion = (props) => {
  const history = useHistory()
  const promotionName = props?.promotionDetail?.name ?? ""
  const productName = props?.promotionDetail?.productDetail?.name ?? ""
  const category = props?.promotionDetail?.productDetail?.category ?? ""
  const subTotal = props?.promotionDetail?.productDetail?.price ?? "0"
  const discont = props?.promotionDetail?.discount ?? '0'
  const total = parseFloat(subTotal) - (parseFloat(subTotal) * (parseFloat(discont) / 100))
  const img = props?.promotionDetail?.productDetail?.thumpnail ?? process.env.PUBLIC_URL + "/img/shoes/casual1.jpeg"
  
  const redirectToState = useCallback(
    () => {
        history.push('/promotion/detail/' + props?.promotionDetail?._id ?? "0")
    },
    [history],
)

  return (
    <button onClick={redirectToState} style={{width: '100%'}}>
      <div className="relative bg-gray-200 shadow-lg rounded-lg p-2 flex flex-wrap mt-6 w-full text-left">
        <img
          alt="..."
          className="shadow-md max-w-full w-32 rounded-md"
          src={img}
        />
        <div className="ml-6 text-gray-600">
          <p className="text-xl mt-4 font-semibold">{promotionName}</p>
          <p className="text-md">{productName}</p>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-gray-400 uppercase last:mr-0 mr-1">
            {category}
          </span>
          <p className="mt-1 text-normal line-through ">{subTotal.toLocaleString('th-TH', {
            style: 'currency',
            currency: 'THB'
          })}</p>
          <p className="text-xl font-semibold text-red-600 ">{total.toLocaleString('th-TH', {
            style: 'currency',
            currency: 'THB'
          })}</p>
        </div>
        <div className="absolute bottom-0 right-0">
          <p className="bg-red-600 text-xl font-semibold text-white h-8 w-14 text-center align-middle">
            {discont}%
        </p>
        </div>
      </div>
    </button>
  );
};
export default CardPromotion;
