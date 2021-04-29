import { Fragment, useEffect } from "react";
import CardLatestProduct from "../Components/CardLatestProduct";
import { PRODUCTS_QUERY_HOME } from "../graphql/productQuery";
import { PROMOTIONS_QUERY_HOME } from "../graphql/promotionQuery";
import { useQuery } from "@apollo/client";
import CardPromotion from "../Components/Customer/CardPromotion";
import CarouselComponent from "../Components/General/CarouselComponent";
import { useSession } from "../contexts/SessionContext";

const Home = () => {
  const { loading, data, error } = useQuery(PRODUCTS_QUERY_HOME);
  const { setLoading } = useSession()
  const { loading: promotionLoading, data: promotionData } = useQuery(PROMOTIONS_QUERY_HOME);
  const carouselImg = [
    process.env.PUBLIC_URL + "/img/bannerHome.png",
    process.env.PUBLIC_URL + "/img/Banner2.jpeg",
    process.env.PUBLIC_URL + "/img/banner3.png",
    process.env.PUBLIC_URL + "/img/banner4.png",
    process.env.PUBLIC_URL + "/img/banner5.png",
  ];

  useEffect(() => {
    console.log(data);
    if (loading || promotionLoading) {
      setLoading(true);
    } else if ((!loading && !promotionLoading) || error) {
      setLoading(false);
    }
  }, [loading, promotionLoading]);

  return (
    <Fragment>
      <CarouselComponent>
        {carouselImg.map((path, index) => {
          return <img src={path} key={index} />;
        })}
      </CarouselComponent>

      <div className="py-5" style={{ width: "80%", margin: "auto" }}>
        <hr />
      </div>
      <div className="relative pt-10 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div className="items-center flex flex-wrap">
          <div className="grid grid-cols-2 gap-0">
            <div className="p-3">
              <div className="m-auto">
                <h3 className="text-3xl font-semibold text-center">
                  Lastest Promotions
                </h3>
                <div className="mx-auto" style={{ width: "75%" }}>
                  {promotionData?.promotions?.map((promotion, index) => (
                    <CardPromotion
                      key={promotion?._id ?? index}
                      promotionDetail={promotion}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="m-auto">
                <h3 className="text-3xl font-semibold text-center">
                  Lastest Products
                </h3>
                <div
                  className="flex flex-wrap mx-auto"
                  style={{ width: "90%" }}
                >
                  {data?.products?.map((product) => {
                    return (
                      <CardLatestProduct
                        key={product?._id ?? 0}
                        product={product}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
