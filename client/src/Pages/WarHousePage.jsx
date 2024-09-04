import React from "react";
import Navbar from "../Components/NavBar";
import Choose from "../Components/Choose";
import LandAvailabilityChart from "../Components/LandAvailabilityChart"; // Import the chart component

const villageNames = [
  "Agar", "Chirgaon", "Gurgaon", "Jind", "Kanina",
  "Mewat", "Nuh", "Panipat", "Rewari", "Sonipat",
  "Tauru", "Ambala", "Bhiwani", "Hisar", "Jhajjar",
  "Karnal", "Kurukshetra", "Sirsa", "Fatehabad", "Panchkula",
  // Add more village names as needed
];

const generateTestData = () => {
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  const data = [];

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const randomVillage = villageNames[Math.floor(Math.random() * villageNames.length)];
    data.push({
      date: d.toISOString().split('T')[0], // YYYY-MM-DD
      availableLand: Math.random() > 0.5 ? 100 : 0, // Randomly assigning availability
      location: randomVillage // Adding a random village name
    });
  }
  return data;
};

const data = generateTestData();

function WarHousePage() {
  return (
    <>
      <div>
        <Navbar />
        <div className="ml-[250px] ">
          <LandAvailabilityChart data={data} /> {/* Adding the chart above Choose */}
          <Choose />
        </div>
      </div>
    </>
  );
}

export default WarHousePage;
