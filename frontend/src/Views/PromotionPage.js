import CardPromotion from "../Components/Customer/CardPromotion";

const Promotion = () => {
  return (
    <>
      <div className="relative pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div className="items-center flex flex-wrap">
          <div className="w-full md:w-4/12 ml-auto sm:mr-10 px-4 mr-auto mt-10">
            <img
              alt="..."
              className="max-w-full rounded-lg shadow-lg"
              src={process.env.PUBLIC_URL + "/img/sale.png"}
            />
          </div>
          {/* Product sale */}
          <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-12">
            <div className="justify-center flex flex-wrap relative">
              {/* Col1 */}
              <div className="my-4 w-full lg:w-6/12">
                <CardPromotion />
                <CardPromotion />
              </div>
              {/* Col2 */}
              <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                <CardPromotion />
                <CardPromotion />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Promotion;
