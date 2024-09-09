import React, { useState } from "react";

const CropManagement = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);

  // Sample data initialization
  const [currentCrops, setCurrentCrops] = useState([
    {
      id: 1,
      name: "Wheat",
      variety: "Hard Red",
      quantity: 50,
      price: 2000,
      bidDate: "2024-08-15",
      harvestDate: "2024-10-01",
      stages: [1, 2, 3, 4, 5],
      completedStages: [1, 2],
    },
    {
      id: 2,
      name: "Rice",
      variety: "Basmati",
      quantity: 30,
      price: 3000,
      bidDate: "2024-07-10",
      harvestDate: "2024-09-15",
      stages: [1, 2, 3, 4, 5],
      completedStages: [1, 2],
    },
    {
      id: 3,
      name: "Barley",
      variety: "Malting",
      quantity: 40,
      price: 2200,
      bidDate: "2024-06-20",
      harvestDate: "2024-08-30",
      stages: [1, 2, 3, 4, 5],
      completedStages: [1, 3],
    },
    {
      id: 4,
      name: "Corn",
      variety: "Sweet Corn",
      quantity: 45,
      price: 2500,
      bidDate: "2024-05-15",
      harvestDate: "2024-07-20",
      stages: [1, 2, 3, 4, 5],
      completedStages: [2, 4],
    },
  ]);

  const [upcomingCrops, setUpcomingCrops] = useState([
    {
      id: 5,
      name: "Oats",
      variety: "Steel Cut",
      quantity: 50,
      price: 1800,
      bidDate: "2024-08-10",
      harvestDate: "2024-10-15",
      bidder: "Alice Johnson",
      bidAmount: 1900,
    },
    {
      id: 6,
      name: "Soybean",
      variety: "Non-GMO",
      quantity: 35,
      price: 2300,
      bidDate: "2024-08-18",
      harvestDate: "2024-11-01",
      bidder: "Bob Smith",
      bidAmount: 2400,
    },
    {
      id: 7,
      name: "Sunflower",
      variety: "Giant",
      quantity: 20,
      price: 2000,
      bidDate: "2024-09-01",
      harvestDate: "2024-12-15",
      bidder: "Carol Williams",
      bidAmount: 2100,
    },
    {
      id: 8,
      name: "Peanuts",
      variety: "Spanish",
      quantity: 40,
      price: 2200,
      bidDate: "2024-09-05",
      harvestDate: "2024-11-25",
      bidder: "David Brown",
      bidAmount: 2300,
    },
  ]);

  const [finishedCrops, setFinishedCrops] = useState([
    {
      id: 9,
      name: "Millet",
      variety: "Pearl",
      quantity: 45,
      price: 1700,
      startDate: "2024-01-01",
      endDate: "2024-04-30",
      buyerName: "XYZ Ltd.",
    },
    {
      id: 10,
      name: "Sorghum",
      variety: "Sweet",
      quantity: 30,
      price: 1900,
      startDate: "2023-11-01",
      endDate: "2024-02-28",
      buyerName: "Farmers Union",
    },
    {
      id: 11,
      name: "Rye",
      variety: "Winter",
      quantity: 50,
      price: 2100,
      startDate: "2023-12-01",
      endDate: "2024-03-31",
      buyerName: "Agro Inc.",
    },
    {
      id: 12,
      name: "Quinoa",
      variety: "Red",
      quantity: 35,
      price: 2500,
      startDate: "2024-02-01",
      endDate: "2024-06-30",
      buyerName: "Grain Co.",
    },
  ]);

  const handleStageClick = (crop, stage) => {
    setSelectedCrop(crop);
    setSelectedStage(stage);
  };

  const handleUpdateClick = () => {
    if (!selectedStage || !selectedCrop) {
      alert("Please select a stage and crop first.");
      return;
    }

    const updatedCrops = currentCrops.map((crop) => {
      if (crop.id === selectedCrop.id) {
        if (!crop.completedStages.includes(selectedStage)) {
          return {
            ...crop,
            completedStages: [...crop.completedStages, selectedStage],
          };
        }
      }
      return crop;
    });

    setCurrentCrops(updatedCrops);
    setSelectedStage(null);
  };

  const handleAcceptBid = (crop) => {
    setCurrentCrops([...currentCrops, { ...crop, stages: [1, 2, 3, 4, 5], completedStages: [] }]);
    setUpcomingCrops(upcomingCrops.filter((c) => c.id !== crop.id));
  };

  const handleRejectBid = (crop) => {
    setUpcomingCrops(upcomingCrops.filter((c) => c.id !== crop.id));
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-8 text-gray-700">
        <button
          className={`py-2 px-4 border-b-4 font-semibold ${
            activeTab === "current" ? "border-blue-600 text-blue-600" : "border-transparent"
          }`}
          onClick={() => setActiveTab("current")}
        >
          Current Crop
        </button>
        <button
          className={`py-2 px-4 border-b-4 font-semibold ${
            activeTab === "upcoming" ? "border-blue-600 text-blue-600" : "border-transparent"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Crop
        </button>
        <button
          className={`py-2 px-4 border-b-4 font-semibold ${
            activeTab === "finished" ? "border-blue-600 text-blue-600" : "border-transparent"
          }`}
          onClick={() => setActiveTab("finished")}
        >
          Finished Crop
        </button>
      </div>

      {/* Current Crops */}
      {activeTab === "current" && (
        <div className="grid grid-cols-1 gap-6">
          {currentCrops.length > 0 ? (
            currentCrops.map((crop) => (
              <div
                key={crop.id}
                className="p-6"
                style={{ backgroundColor: "rgba(30,64,175,255)", borderRadius: "8px" }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{crop.name}</h3>
                    <p className="text-white">Variety: {crop.variety}</p>
                    <p className="text-white">Quantity: {crop.quantity} tons</p>
                    <p className="text-white">Price: Rs {crop.price}</p>
                    <p className="text-white">Bid Date: {crop.bidDate}</p>
                    <p className="text-white">Harvest Date: {crop.harvestDate}</p>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex space-x-2 mb-4">
                      {crop.stages.map((stage) => (
                        <button
                          key={stage}
                          className={`py-2 px-3 border rounded-lg text-sm font-semibold ${
                            crop.completedStages.includes(stage)
                              ? "bg-green-500 text-white"
                              : selectedCrop &&
                                selectedCrop.id === crop.id &&
                                selectedStage === stage
                              ? "border-green-500 text-green-500"
                              : "border-white text-white"
                          }`}
                          onClick={() => handleStageClick(crop, stage)}
                        >
                          Stage {stage}
                        </button>
                      ))}
                    </div>
                    <button
                      className="py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold"
                      onClick={handleUpdateClick}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No current crops available</p>
          )}
        </div>
      )}

      {/* Upcoming Crops */}
      {activeTab === "upcoming" && (
        <div className="grid grid-cols-1 gap-6">
          {upcomingCrops.length > 0 ? (
            upcomingCrops.map((crop) => (
              <div
                key={crop.id}
                className="p-6"
                style={{ backgroundColor: "rgba(30,64,175,255)", borderRadius: "8px" }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{crop.name}</h3>
                    <p className="text-white">Variety: {crop.variety}</p>
                    <p className="text-white">Quantity: {crop.quantity} tons</p>
                    <p className="text-white">Price: Rs {crop.price}</p>
                    <p className="text-white">Bid Date: {crop.bidDate}</p>
                    <p className="text-white">Harvest Date: {crop.harvestDate}</p>
                    <p className="text-white">Bidder: {crop.bidder}</p>
                    <p className="text-white">Bid Amount: Rs {crop.bidAmount}</p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      className="py-2 px-6 bg-green-600 text-white rounded-lg font-semibold"
                      onClick={() => handleAcceptBid(crop)}
                    >
                      Accept
                    </button>
                    <button
                      className="py-2 px-6 bg-red-600 text-white rounded-lg font-semibold"
                      onClick={() => handleRejectBid(crop)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No upcoming crops available</p>
          )}
        </div>
      )}

      {/* Finished Crops */}
      {activeTab === "finished" && (
        <div className="grid grid-cols-1 gap-6">
          {finishedCrops.length > 0 ? (
            finishedCrops.map((crop) => (
              <div
                key={crop.id}
                className="p-6"
                style={{ backgroundColor: "rgba(30,64,175,255)", borderRadius: "8px" }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-white">{crop.name}</h3>
                  <p className="text-white">Variety: {crop.variety}</p>
                  <p className="text-white">Quantity: {crop.quantity} tons</p>
                  <p className="text-white">Price: Rs {crop.price}</p>
                  <p className="text-white">Start Date: {crop.startDate}</p>
                  <p className="text-white">End Date: {crop.endDate}</p>
                  <p className="text-white">Buyer Name: {crop.buyerName}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No finished crops available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CropManagement;