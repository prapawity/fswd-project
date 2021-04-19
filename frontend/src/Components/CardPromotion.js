const CardPromotion = () => {
  return (
    <div className="relative bg-gray-200 shadow-lg rounded-lg p-2 flex flex-wrap mt-6">
      <img
        alt="..."
        className="shadow-md max-w-full w-32 rounded-md"
        src={process.env.PUBLIC_URL + "/img/shoes/casual1.jpeg"}
      />
      <div className="ml-6 text-gray-600">
        <p className="text-xl mt-4 font-semibold">Nike Ryz 365 2</p>
        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-gray-400 uppercase last:mr-0 mr-1">
          Casual
        </span>
        <p className="mt-1 text-normal line-through ">฿3,100</p>
        <p className="text-xl font-semibold text-red-600 ">฿2,100 THB</p>
      </div>
      <div className="absolute bottom-0 right-0">
        <p className="bg-red-600 text-xl font-semibold text-white h-8 w-14 text-center align-middle">
          20%
        </p>
      </div>
    </div>
  );
};
export default CardPromotion;
