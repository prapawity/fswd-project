import { useCallback } from "react";
import { useHistory } from "react-router"
const CardLatestProduct = (props) => {
  const history = useHistory()
  const name = props?.product?.name ?? "NAME"
  const type = props?.product?.category ?? "TYPE"
  const price = parseFloat(props?.product?.price ?? "")
  const img = props?.product?.thumpnail ?? process.env.PUBLIC_URL + "/img/shoes/casual1.jpeg"

  const redirectToProductDetail = useCallback(
    () => {
        history.push(`/product/detail/${props?.product?._id ?? 0}`)
    },
    [history],
)

  return (
    <button onClick={redirectToProductDetail} className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center h-full">

      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
        <div className="px-4 py-5 flex-auto">
          <img
            alt="..."
            src={img}
            style={{ height: '20vh' }}
            className="shadow-lg rounded-full mx-auto max-w-120-px"
          />
          <div className="pt-6 text-center">
            <h5 className="text-xl ">{name}</h5>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-gray-600 bg-gray-200 uppercase last:mr-0 mr-1">
              {type}
            </span>
            <p className="mt-1 text-sm text-Grays-400 uppercase">
              {price.toLocaleString('th-TH', {
                style: 'currency',
                currency: 'THB'
              })}
            </p>
          </div>
        </div>
      </div>

    </button>
  );
};
export default CardLatestProduct;