import { SparklesIcon } from "@heroicons/react/solid"
import Jumbotron from "../Components/General/Jumbotron"
import CardLatestProduct from '../Components/CardLatestProduct'

const Home = () => {
    return (
        <main>
            <Jumbotron img={(process.env.PUBLIC_URL + '/img/Banner2.jpeg')} />

      <div className="relative pt-10 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div className="items-center flex flex-wrap">
          <div className="w-full md:w-4/12 ml-auto sm:mr-10 px-4 mr-auto">
            <img
              alt="..."
              className="max-w-full rounded-lg shadow-lg"
              src={process.env.PUBLIC_URL + "/img/sale.png"}
            />
          </div>
          <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
            <div className="md:pr-12 mt-5 sm:mt-0">
              <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-gray-300">
                <SparklesIcon className="h-7 w-7 text-white-500" />
              </div>
              <h3 className="text-3xl font-semibold">Lastest Products</h3>
              <div className="flex flex-wrap">
                <CardLatestProduct />
                <CardLatestProduct />
                <CardLatestProduct />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
