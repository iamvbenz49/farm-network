import React, { useState } from "react";
import BarChart from "./BarChart";
import Table from "./Table";

function Choose() {
  const [selectedData, setSelectedData] = useState("processed"); // Default to "processed"

  // Define data and styling based on the selected type
  const dataMap = {
    processed: [
      { name: "Jan", value: 20 },
      { name: "Feb", value: 40 },
      { name: "Mar", value: 60 },
      { name: "Apr", value: 80 },
      { name: "May", value: 100 }
    ],
    unprocessed: [
      { name: "Jan", value: 15 },
      { name: "Feb", value: 30 },
      { name: "Mar", value: 45 },
      { name: "Apr", value: 60 },
      { name: "May", value: 75 }
    ],
    upcoming: [
      { name: "Jan", value: 10 },
      { name: "Feb", value: 25 },
      { name: "Mar", value: 50 },
      { name: "Apr", value: 70 },
      { name: "May", value: 90 }
    ]
  };

  const backgroundColorMap = {
    processed: "bg-blue-100",
    unprocessed: "bg-red-100",
    upcoming: "bg-green-100"
  };

  const barColorMap = {
    processed: "#1f77b4", // Blue
    unprocessed: "#ff7f0e", // Orange
    upcoming: "#2ca02c" // Green
  };

  const shadowClass = selectedData === "processed" ? "shadow-xl" : "shadow-lg";

  return (
    <div className="relative px-4 mt-4"> {/* Reduced mt-4 */}
      {/* Navbar-like Buttons for choosing data */}
      <div className="flex bg-gray-100 rounded-md shadow-md mb-6">
        <button
          onClick={() => setSelectedData("processed")}
          className={`flex-1 px-3 py-2 rounded-l-md ${selectedData === "processed" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Processed
        </button>
        <button
          onClick={() => setSelectedData("unprocessed")}
          className={`flex-1 px-3 py-2 ${selectedData === "unprocessed" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Unprocessed
        </button>
        <button
          onClick={() => setSelectedData("upcoming")}
          className={`flex-1 px-3 py-2 rounded-r-md ${selectedData === "upcoming" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Upcoming
        </button>
      </div>

      {/* Displaying the BarChart based on the selected data */}
      <div className={`p-4 rounded-lg ${backgroundColorMap[selectedData]} ${shadowClass} mb-6`}>
        <BarChart data={dataMap[selectedData]} barColor={barColorMap[selectedData]} />
      </div>

      {/* Adding the Table Component below the BarChart */}
      <Table />
    </div>
  );
}

export default Choose;

