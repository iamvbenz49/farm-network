import React, { useState } from "react";

const Description = (props) => {
    const { name, quantity, MSP, totalMSP, farmers } = props;
    const [sentRequestId, setSentRequestId] = useState(null); // Track the ID of the farmer whose request was sent

    const handleSendRequest = (farmerId) => {
        // Set the ID of the farmer whose request was sent
        setSentRequestId(farmerId);
    };

    return (
        <div className="w-4/5 mx-auto bg-white shadow-lg hover:shadow-xl p-6 rounded-xl transition-all duration-300 ease-in-out max-h-[400px] overflow-y-auto">
            <div className="flex flex-col md:flex-row">
                {/* Main Information Section */}
                <div className="md:w-2/3 pr-0 md:pr-4 mb-6 md:mb-0">
                    <h1 className="font-bold text-xl text-blue-700 mb-2">{name}</h1>
                    <div className="bg-blue-800 p-4 rounded-lg shadow-md">
                        <h2 className="text-white text-base font-semibold">Details</h2>
                        <div className="space-y-1 mt-2">
                            <p className="text-white">Quantity: <span className="font-semibold">{quantity}</span></p>
                            <p className="text-white">MSP: <span className="font-semibold">{MSP}</span></p>
                            <p className="text-white">Total MSP: <span className="font-semibold">{totalMSP}</span></p>
                        </div>
                    </div>
                </div>
                {/* Farmers List Section */}
                {
                    props.type === "unprocessed" ? 

                    <div className="md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="font-semibold text-base text-gray-800 mb-2">Farmers</h2>
                    <div className="h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300">
                        {farmers && farmers.length > 0 ? (
                            farmers.map((farmer) => (
                                <div key={farmer.id} className="mb-2 p-2 bg-white rounded-lg shadow-sm flex justify-between items-center">
                                    <p className="text-gray-800">Farmer: <span className="font-medium">{farmer.name}</span></p>
                                    <button
                                        onClick={() => handleSendRequest(farmer.id)}
                                        className={`px-4 py-2 rounded-lg text-white ${sentRequestId === farmer.id ? 'bg-green-500' : 'bg-red-500'} ${sentRequestId && sentRequestId !== farmer.id ? 'cursor-not-allowed' : ''}`}
                                        disabled={sentRequestId && sentRequestId !== farmer.id}
                                    >
                                        {sentRequestId === farmer.id ? 'Sent' : 'Send Request'}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No farmers listed.</p>
                        )}
                    </div>
                </div> :
                    <div className="md:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="font-semibold text-base text-gray-800 mb-2">Farmers</h2>
                    <div className="h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300">
                        {farmers && farmers.length > 0 ? (
                            
                                <div key={farmers[0].id} className="mb-2 p-2 bg-white rounded-lg shadow-sm flex justify-between items-center">
                                    <p className="text-gray-800">Farmer: <span className="font-medium">{farmers[0].name}</span></p>
                                </div>
                            
                        ) : (
                            <p className="text-gray-600">No farmers listed.</p>
                        )}
                    </div>
                </div>
                }
            </div>
        </div>
    );
};

export default Description;
