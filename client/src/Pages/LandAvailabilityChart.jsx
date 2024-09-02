import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LandAvailabilityChart = ({ data }) => {
  return (
    <div className="w-full h-64 mb-16"> {/* Increased the margin-bottom to prevent overlapping */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Land Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="availableLand"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LandAvailabilityChart;
