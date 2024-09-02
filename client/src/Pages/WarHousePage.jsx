import React from "react";
import Navbar from "../Components/NavBar";
import Choose from "./Choose";
import LandAvailabilityChart from "./LandAvailabilityChart"; // Import the chart component

const data = [
  { date: '2024-08-01', availableLand: 500 },
  { date: '2024-08-02', availableLand: 450 },
  { date: '2024-08-03', availableLand: 480 },
  // More data points here...
];

function WarHousePage() {
  return (
    <>
      <div>
        <Navbar />
        <div className="ml-[250px] p-4">
          <LandAvailabilityChart data={data} /> {/* Adding the chart above Choose */}
          <Choose />
        </div>
      </div>
    </>
  );
}

export default WarHousePage;
