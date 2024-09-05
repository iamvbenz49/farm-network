import React, { useState } from "react";
import { FiBell } from 'react-icons/fi'; 
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai'; // Add this for notification icons

function Navbar(props) {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New bid came from Dhamodhar", icon: <AiOutlineInfoCircle className="text-blue-500" /> },
    { id: 2, text: "Market price update for wheat", icon: <AiOutlineInfoCircle className="text-green-500" /> },
    { id: 3, text: "Bid accepted for corn from Rajesh", icon: <AiOutlineInfoCircle className="text-red-500" /> },
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNotificationClick = () => {
    setShowDropdown(!showDropdown);
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
              Market Need
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
                <FiBell
                  className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700 transition-colors"
                  onClick={handleNotificationClick}
                />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full" />
                )}
                {showDropdown && (
                  <div className="absolute top-12 right-0 w-64 bg-white shadow-lg rounded-lg z-30 transition-transform transform scale-100 opacity-100">
                    <ul className="divide-y divide-gray-200">
                      {notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className="p-4 flex items-center space-x-3 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <div className="text-xl">
                            {notification.icon}
                          </div>
                          <div>{notification.text}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <FaUserCircle className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700 transition-colors" />
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
