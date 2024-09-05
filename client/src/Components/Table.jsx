import React from "react";
import Description from "./Description.jsx";

// Function to generate random data
const generateRandomData = () => {
  const fruits = ["Orange", "Apple", "Banana", "Mango", "Pineapple"];
  const farmerNames = [
    "John Doe",
    "Jane Smith",
    "Samuel Green",
    "Alice Johnson",
    "Bob Brown",
    "Carol White",
    "David Black",
    "Emma Stone",
    "Michael Gray",
    "Sophia Blue"
  ];

  // Generate a random fruit name, quantity, MSP, and total MSP
  const name = fruits[Math.floor(Math.random() * fruits.length)];
  const quantity = Math.floor(Math.random() * 500) + 50; // Random quantity between 50 and 550
  const MSP = Math.floor(Math.random() * 100) + 250; // Random MSP between 250 and 350
  const totalMSP = Math.floor(Math.random() * 100) + 10; // Random total MSP between 10 and 110

  // Generate a random number of farmers with random names
  const numFarmers = Math.floor(Math.random() * 5) + 2; // Random number of farmers between 2 and 6
  const farmers = Array.from({ length: numFarmers }, () => ({
    name: farmerNames[Math.floor(Math.random() * farmerNames.length)],
  }));

  return { name, quantity, MSP, totalMSP, farmers };
};

const Table = (props) => {
  // Generate random data for multiple descriptions
  const descriptions = Array.from({ length: 3 }, () => generateRandomData());

  return (
    <div className="p-8">
      {!(props.page === "warehouse" && props.type === "unprocessed") &&
      <div className="max-h-[300px] overflow-y-auto shadow-lg p-4 rounded-lg bg-white">
        {descriptions.map((data, index) => (
          <Description
            key={index}
            name={data.name}
            quantity={data.quantity}
            MSP={data.MSP}
            totalMSP={data.totalMSP}
            farmers={data.farmers}
            page = {props.page}
            type = {props.type}
          />
        ))}
      </div> }
    </div>
  );
};

export default Table;
