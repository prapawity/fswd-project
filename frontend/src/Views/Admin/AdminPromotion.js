import CardAdminPromotion from "../../Components/AdminPromotion/CardAdminPromotion";
import { PlusIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PROMOTIONS_QUERY } from "../../graphql/promotionQuery";

const AdminPromotion = (props) => {
  const header = [
    "promotion name",
    "product name",
    "full price",
    "promo price",
    "discount",
    "limit",
    " ",
  ];
  const { data } = useQuery(PROMOTIONS_QUERY, { fetchPolicy: 'no-cache' })

  return (
    <div className="flex flex-wrap mt-4 ">
      <div className="w-full mb-12 px-4">
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-lightBlue-900 text-gray-500"
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className={"font-semibold text-2xl text-gray-700"}>
                  Admin Promotion
                </h3>
              </div>
            </div>
          </div>
          <CardAdminPromotion type={header} data={data} />
          <div className="rounded-t mb-0 px-4 py-2 border-0 widt">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-0 max-w-full flex-grow flex-1">
                <Link to="/admin/promotion/create">
                  <button
                    className={
                      "bg-blue-500 active:bg-gray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-5 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150"
                    }
                  >
                    <div className="flex flex-wrap justify-center">
                      <PlusIcon className="text-white-600 h-4 w-4 mr-1" />
                      Creat Promotion
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminPromotion;
