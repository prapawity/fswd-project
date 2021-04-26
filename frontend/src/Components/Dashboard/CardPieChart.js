import React from "react";
import Chart from "chart.js";

const CardPieChart = () => {
  React.useEffect(() => {
    let config = {
        type: 'pie',
        data: {
          labels: ["In Process", "Completed"],
          datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#81b214","#ffcc29",],
            data: [2478,5267]
          }]
        },
        options: {
            legend: {
                labels: {
                  fontColor: "rgba(0,0,0,.4)",
                },
                align: "end",
                position: "left",
              },
        }
    };
    let ctx = document.getElementById("pie-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Order Status
              </h2>
            </div>
          </div>
        </div>
        <div className="p-2 mb-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px" style={{height: '350px'}}>
            <canvas id="pie-chart"></canvas>
          </div>
        </div>
      </div>
      
    </>
  );
};
export default CardPieChart;
