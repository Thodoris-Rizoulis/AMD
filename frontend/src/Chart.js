import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Chart({ temps }) {
  return (
    <div className="max-w-[640px] mx-auto mt-14 bg-white">
      {console.log("rerender")}
      <Line data={temps} />
    </div>
  );
}
