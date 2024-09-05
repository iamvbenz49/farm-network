import React, { useState } from "react";
import BarChart from "./BarChart";
import Table from "./Table";

// Function to generate random data for crops
function generateData(cropNames, min, max) {
  return cropNames.map((crop) => ({
    name: crop,
    value: Math.floor(Math.random() * (max - min + 1)) + min
  }));
}

function Choose(props) {
  const [selectedData, setSelectedData] = useState("processed"); // Default to "processed"

  // List of 10 crop names
  const cropNames = [
    "Wheat", "Rice", "Corn", "Barley", "Soybean", 
    "Sorghum", "Oats", "Millet", "Rye", "Quinoa"
  ];

  // Define data and styling based on the selected type
  const dataMap = {
    processed: generateData(cropNames, 400, 900),    // Values between 400 and 900
    unprocessed: generateData(cropNames, 200, 600),  // Values between 200 and 600
    upcoming: generateData(cropNames, 100, 500)      // Values between 100 and 500
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
    <div className="relative px-4 mt-4">
      {/* Navbar-like Buttons for choosing data */}
      <div className="flex bg-gray-100 rounded-md shadow-md mb-6">
        <button
          onClick={() => setSelectedData("processed")}
          className={`flex-1 px-3 py-2 rounded-l-md ${selectedData === "processed" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
           {props.page !== "warehouse"?<span>Processing</span>:<span>Filled</span>}
        </button>
        {props.page !== "warehouse" && <button
          onClick={() => setSelectedData("unprocessed")}
          className={`flex-1 px-3 py-2 ${selectedData === "unprocessed" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          Unprocessed
        </button>}
        <button
          onClick={() => setSelectedData("upcoming")}
          className={`flex-1 px-3 py-2 rounded-r-md ${selectedData === "upcoming" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          {props.page !== "warehouse"?<span>History</span>:<span>Unfilled</span>}
        </button>
      </div>

      {/* Displaying the BarChart based on the selected data */}
      <div className={`p-4 rounded-lg ${backgroundColorMap[selectedData]} ${shadowClass} mb-6`}>
        <BarChart data={dataMap[selectedData]} barColor={barColorMap[selectedData]} />
      </div>

      {/* Adding the Table Component below the BarChart */}
      <Table page = {props.page} type = {selectedData}/>
    </div>
  );
}

export default Choose;
