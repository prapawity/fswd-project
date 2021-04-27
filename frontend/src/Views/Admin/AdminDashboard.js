import CardLineChart from "../../Components/Dashboard/CardLineChart";
import CardBarChart from "../../Components/Dashboard/CardBarChart";
import CardStats from "../../Components/Dashboard/CardStats";
import { Fragment } from "react";
import CardPieChart from "../../Components/Dashboard/CardPieChart";

const AdminDashboard = () => {
  return (
    <Fragment>
      <div className="relative bg-gray-200 md:pt-8 pb-12 pt-4 ">
        <h1 className="font-bold text-3xl text-center m-5">Dashboards</h1>
        <div className="px-4 md:px-12 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
                <CardStats
                  statSubtitle="All"
                  statTitle="350,897"
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-green-600"
                  statDescripiron="Since last month"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
                <CardStats
                  statSubtitle="Running"
                  statTitle="2,356"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
                <CardStats
                  statSubtitle="Casual"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-red-500"
                  statDescripiron="Since yesterday"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
                <CardStats
                  statSubtitle="Football"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-red-500"
                  statDescripiron="Since yesterday"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
                <CardStats
                  statSubtitle="Basketball"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-red-500"
                  statDescripiron="Since yesterday"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-2/12 px-4">
                <CardStats
                  statSubtitle="Sandal"
                  statTitle="924"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-red-500"
                  statDescripiron="Since yesterday"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="flex flex-wrap mt-6">
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        {/* <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div> */}
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <CardPieChart />
        </div>
        <div className="w-full xl:w-6/12 px-4">
          <CardBarChart />
        </div>
      </div>

    </Fragment>
  );
};
export default AdminDashboard;
