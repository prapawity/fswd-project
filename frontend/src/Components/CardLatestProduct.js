const CardLatestProduct = () => {
  return (
    <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
        <div className="px-4 py-5 flex-auto">
          <img
            alt="..."
            src={process.env.PUBLIC_URL + "/img/shoes/casual1.jpeg"}
            className="shadow-lg rounded-full mx-auto max-w-120-px"
          />
          <div className="pt-6 text-center">
            <h5 className="text-xl font-bold">Nike Ryz 365 2</h5>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-gray-600 bg-gray-200 uppercase last:mr-0 mr-1">
              Casual
            </span>
            <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
              ฿3,100
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardLatestProduct;