import { useEffect, useState } from "react";
import Chart from "chart.js";
import { useQuery } from "@apollo/client";
import { PRODUCTS_QUERY } from "../../graphql/productQuery";

const CardLineChart = () => {
  const { data, error } = useQuery(PRODUCTS_QUERY);
  const [dateData, setDate] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: 0,
    28: 0,
    29: 0,
    30: 0,
  });
  const rangeDate = [...Array(32).keys()];

  useEffect(() => {
    if (rangeDate.length > 31) {
      rangeDate.shift();
    }
    if (data) {
      const dic = {};
      data?.products?.map((prod) => {
        const date = new Date(prod.timestamp);
        const dateDay = date.getDate();
        dic[dateDay] = (dic[dateDay] ?? 0) + 1;
      });
      Object.keys(dic).map((key, value) => {
        setDate((prev) => ({ ...prev, [key]: dic[key] }));
      });
    }
  }, [data]);
  useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: rangeDate,
        datasets: [
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "green",
            borderColor: "green",
            data: rangeDate.map((day) => dateData[day]),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Products Charts",
          fontColor: "gray",
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        // hover: {
        //   mode: "nearest",
        //   intersect: true,
        // },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: false,
                fontColor: "gray",
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Day",
                fontColor: "gray",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                fontColor: "gray",
                steps: 10,
                stepValue: 5,
                max: 10,
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Value",
                fontColor: "gray",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [dateData]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-gray-600 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-gray-600 text-xl font-semibold">Products</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px" style={{ height: "350px" }}>
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardLineChart;
