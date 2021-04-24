import { Fragment, useEffect } from "react"
import CardLatestProduct from "../Components/CardLatestProduct"
import { PRODUCTS_QUERTY_HOME } from "../graphql/productQuery"
import { useQuery } from "@apollo/client"
import CardPromotion from "../Components/Customer/CardPromotion"
import CarouselComponent from "../Components/General/CarouselComponent"

const Home = (props) => {
  const { loading, data, error } = useQuery(PRODUCTS_QUERTY_HOME)
  const carouselImg = [process.env.PUBLIC_URL + "/img/bannerHome.png", process.env.PUBLIC_URL + "/img/Banner2.jpeg"]
  useEffect(() => {
    console.log(data)
    if (loading) {
      props?.showLoading(true)
    } else if (!loading || error) {
      props?.showLoading(false)
    }
  }, [loading])
  return (
    <Fragment>
      <CarouselComponent>
        {carouselImg.map((path, index) => {
          return <img src={path} key={index} />
        })}
      </CarouselComponent>

      <div className="py-5" style={{ width: '80%', margin: 'auto' }}>
        <hr />
      </div>
      <div className="relative pt-10 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div className="items-center flex flex-wrap">
          <div className="grid grid-cols-2 gap-0">
            <div className="p-3">
              <div className="m-auto">
                <h3 className="text-3xl font-semibold text-center">Lastest Promotions</h3>
                <div className="mx-auto" style={{ width: '75%' }}>
                  <CardPromotion />
                  <CardPromotion />
                  <CardPromotion />
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="m-auto">
                <h3 className="text-3xl font-semibold text-center">Lastest Products</h3>
                <div className="flex flex-wrap mx-auto" style={{ width: '90%' }}>
                  {data?.products?.map((product) => {
                    return <CardLatestProduct product={product} />
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