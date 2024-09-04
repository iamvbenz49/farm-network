import React from "react";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function BarChart({ data, barColor }) {
  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <RechartsBarChart
        width={800}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill={barColor} />
      </RechartsBarChart>
    </div>
  );
}

export default BarChart;
