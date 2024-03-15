import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, Title, BarElement } from "chart.js";

const Barchart = ({ data }) => {
  Chart.register(CategoryScale, LinearScale, Title, BarElement);
  const labels = data.map((item) => `${item.name} (${item.countView})`); // รวม labels และ countViews เข้าด้วยกัน
  const countViews = data.map((item) => item.countView); // เลือกข้อมูล countView มาใช้ใน datasets
  //console.log(data);
  //console.log(labels);
  //console.log(countViews);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md grid grid-cols-1">
      <h3 className="text-sm md:text-lg font-semibold my-5 text-center">ยอดอ่านบทความ</h3>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "บทความ",
              data: countViews,
              backgroundColor: [
                "rgba(251,62,46, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgb(161,232,0, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
                "rgb(68,68,68, 0.2)",
              ],
              borderColor: [
                "rgba(251,62,46)",
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(161,232,0)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
                "rgb(68,68,68)",
              ],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default Barchart;
