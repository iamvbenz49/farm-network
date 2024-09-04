import React, { useState } from "react";

const CropManagement = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);

  const [crops, setCrops] = useState([
    {
      id: 1,
      name: "Wheat",
      variety: "Hard Red",
      quantity: 120,
      price: 5000,
      bidDate: "2024-08-15",
      harvestDate: "2024-12-01",
      stages: [1, 2, 3, 4, 5],
      completedStages: [],
    },
    {
      id: 2,
      name: "Corn",
      variety: "Sweet Corn",
      quantity: 150,
      price: 6000,
      bidDate: "2024-09-10",
      harvestDate: "2024-11-15",
      stages: [1, 2, 3, 4, 5],
      completedStages: [],
    },
  ]);

  const [upcomingBids, setUpcomingBids] = useState([
    {
      id: 1,
      cropName: "Soybean",
      bidderName: "John Doe",
      bidAmount: 7000,
      harvestDate: "2024-10-01",
      quantity: 100,
    },
    {
      id: 2,
      cropName: "Barley",
      bidderName: "Jane Smith",
      bidAmount: 6500,
      harvestDate: "2024-11-20",
      quantity: 120,
    },
  ]);

  const [finishedCrops, setFinishedCrops] = useState([
    {
      id: 1,
      cropName: "Rice",
      startDate: "2023-06-01",
      endDate: "2023-12-01",
      quantity: 200,
      price: 10000,
      buyerName: "Alice Johnson",
    },
    {
      id: 2,
      cropName: "Oats",
      startDate: "2023-07-01",
      endDate: "2023-11-01",
      quantity: 180,
      price: 9000,
      buyerName: "Bob Brown",
    },
  ]);

  const handleStageClick = (crop, stage) => {
    setSelectedCrop(crop);
    setSelectedStage(stage);
  };

  const handleUpdateClick = () => {
    if (!selectedStage) {
      alert("Please select a stage first.");
      return;
    }

    // Update the stage color to green for the selected crop
    const updatedCrops = crops.map((crop) => {
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

    setCrops(updatedCrops);
    setSelectedStage(null); // Reset stage selection after updating
  };

  const handleAcceptBid = (bid) => {
    // Move bid to current crops
    const newCrop = {
      id: crops.length + 1,
      name: bid.cropName,
      variety: "Unknown",
      quantity: bid.quantity,
      price: bid.bidAmount,
      bidDate: new Date().toISOString().split("T")[0],
      harvestDate: bid.harvestDate,
      stages: [1, 2, 3, 4, 5],
      completedStages: [],
    };
    setCrops([...crops, newCrop]);
    setUpcomingBids(upcomingBids.filter((b) => b.id !== bid.id));
  };

  const handleRejectBid = (bid) => {
    setUpcomingBids(upcomingBids.filter((b) => b.id !== bid.id));
  };

  return (
    <div className="p-8">
      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-8">
        <button
          className={`py-2 px-4 border-b-2 font-semibold ${
            activeTab === "current" ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => setActiveTab("current")}
        >
          Current Crop
        </button>
        <button
          className={`py-2 px-4 border-b-2 font-semibold ${
            activeTab === "upcoming" ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Crop
        </button>
        <button
          className={`py-2 px-4 border-b-2 font-semibold ${
            activeTab === "finished" ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => setActiveTab("finished")}
        >
          Finished Crop
        </button>
      </div>

      {/* Content */}
      {activeTab === "current" && (
        <div>
          {crops.map((crop) => (
            <div
              key={crop.id}
              className="mb-6 p-4 border rounded-lg shadow-lg flex items-start"
            >
              {/* Crop Details */}
              <div className="flex-1">
                <h3 className="text-xl font-bold">{crop.name}</h3>
                <p className="text-gray-600">Variety: {crop.variety}</p>
                <p className="text-gray-600">Quantity: {crop.quantity} tons</p>
                <p className="text-gray-600">Price: Rs {crop.price}</p>
                <p className="text-gray-600">Bid Date: {crop.bidDate}</p>
                <p className="text-gray-600">Harvest Date: {crop.harvestDate}</p>
              </div>

              {/* Stages and Update Button */}
              <div className="flex flex-col items-end">
                <div className="mb-4">
                  {crop.stages.map((stage) => (
                    <button
                      key={stage}
                      className={`py-2 px-4 mx-1 border rounded-lg ${
                        crop.completedStages.includes(stage)
                          ? "bg-green-500 text-white"
                          : selectedCrop &&
                            selectedCrop.id === crop.id &&
                            selectedStage === stage
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleStageClick(crop, stage)}
                    >
                      Stage {stage}
                    </button>
                  ))}
                </div>
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg"
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "upcoming" && (
        <div>
          {upcomingBids.map((bid) => (
            <div
              key={bid.id}
              className="mb-6 p-4 border rounded-lg shadow-lg flex items-start justify-between"
            >
              <div>
                <h3 className="text-xl font-bold">{bid.cropName}</h3>
                <p className="text-gray-600">Bidder Name: {bid.bidderName}</p>
                <p className="text-gray-600">Bid Amount: Rs {bid.bidAmount}</p>
                <p className="text-gray-600">Harvest Date: {bid.harvestDate}</p>
                <p className="text-gray-600">Quantity: {bid.quantity} tons</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="py-2 px-4 bg-green-500 text-white rounded-lg"
                  onClick={() => handleAcceptBid(bid)}
                >
                  Accept
                </button>
                <button
                  className="py-2 px-4 bg-red-500 text-white rounded-lg"
                  onClick={() => handleRejectBid(bid)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "finished" && (
        <div>
          {finishedCrops.map((crop) => (
            <div
              key={crop.id}
              className="mb-6 p-4 border rounded-lg shadow-lg flex items-start justify-between"
            >
              <div>
                <h3 className="text-xl font-bold">{crop.cropName}</h3>
                <p className="text-gray-600">Start Date: {crop.startDate}</p>
                <p className="text-gray-600">End Date: {crop.endDate}</p>
                <p className="text-gray-600">Quantity: {crop.quantity} tons</p>
                <p className="text-gray-600">Price: Rs {crop.price}</p>
                <p className="text-gray-600">Buyer Name: {crop.buyerName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropManagement;
