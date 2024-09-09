import React, { useState } from "react";
import { FiBell } from 'react-icons/fi'; 
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New bid came from Dhamodhar", type: "info" },
    { id: 2, text: "Market price update for wheat", type: "update" },
    { id: 3, text: "Bid accepted for corn from Rajesh", type: "success" },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNotificationClick = () => {
    setShowDropdown(!showDropdown);
  };

  const getNotificationClass = (type) => {
    switch (type) {
      case "info":
        return "text-blue-700 bg-blue-100 border-blue-200"; // Blue for informational messages
      case "update":
        return "text-yellow-700 bg-yellow-100 border-yellow-200"; // Yellow for updates
      case "success":
        return "text-green-700 bg-green-100 border-green-200"; // Green for success messages
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"; // Default gray color
    }
  };

  return (
    <div className="flex">
      {/* Permanent Settings Section */}
      <div
        className="fixed top-0 left-0 h-full bg-[#283048] shadow-lg z-20"
        style={{ width: "250px" }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Settings</h2>
          <ul className="space-y-4 text-white">
            <li className="text-lg cursor-pointer hover:bg-[#1e2532] p-2 rounded">
              Home
            </li>
            <li className="text-lg cursor-pointer hover:bg-[#1e2532] p-2 rounded">
              Marketneed
            </li>
            <li className="text-lg cursor-pointer hover:bg-[#1e2532] p-2 rounded">
              BarCharts
            </li>
            <li className="text-lg cursor-pointer hover:bg-[#1e2532] p-2 rounded">
              More
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content (Takes up the remaining space) */}
      <div className="ml-[250px] flex-1">
        {/* Navbar */}
        <nav className="bg-white shadow-md p-4 fixed z-10 w-[calc(100%-250px)] mb-2">
          <div className="container mx-auto flex justify-between items-center">
            {/* Left - Logo */}
            <div className="flex items-center">
              <span className="ml-4 text-2xl font-bold text-blue-500">
                FarmNetwork
              </span>
            </div>

            {/* Center - Search Box */}
            <div className="flex-grow mx-8">
              <input
                type="text"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
              />
            </div>

            {/* Right - Notification Icon and Profile */}
            <div className="relative flex items-center space-x-6">
              <div className="relative">
                <button
                  className="relative"
                  onClick={handleNotificationClick}
                >
                  <FiBell
                    className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700"
                  />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
                  )}
                </button>
                {showDropdown && (
                  <div className="absolute top-12 right-0 w-80 bg-white border border-gray-300 shadow-xl rounded-lg z-30 transition-transform transform scale-100 origin-top-right">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-bold p-3 rounded-t-lg shadow-md">
                      Notifications
                    </div>
                    <ul className="divide-y divide-gray-300">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <li
                            key={notification.id}
                            className={`p-4 text-sm ${getNotificationClass(notification.type)} border-l-4 border-${notification.type}-500 rounded-lg hover:bg-${notification.type}-50 transition-colors duration-150`}
                          >
                            {notification.text}
                          </li>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              <FaUserCircle className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700" />
            </div>
          </div>
        </nav>

        {/* Content Section */}
        <div className="p-8 mt-10">
          {/* Content goes here */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
