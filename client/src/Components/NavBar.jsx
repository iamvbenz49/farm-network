import React, { useState } from "react";
import { FiMenu, FiMessageCircle } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Function to toggle settings panel
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className={`bg-white shadow-md fixed w-full top-0 left-0 z-10 transition-transform duration-300 ${
          isSettingsOpen ? 'transform translate-x-64' : ''
        } py-6`}>
        <div className="flex items-center px-4">
          
          {/* Left - Hamburger Icon and Logo */}
          <div className="flex items-center space-x-4">
            <FiMenu
              onClick={toggleSettings}
              className="text-3xl text-blue-500 cursor-pointer hover:text-blue-700"
            />
            <span className="text-2xl font-bold text-blue-500">
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

          {/* Right - Message Icon and Profile */}
          <div className="flex items-center space-x-6">
            <FiMessageCircle className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700" />
            <FaUserCircle className="text-2xl text-blue-500 cursor-pointer hover:text-blue-700" />
          </div>
        </div>
      </nav>

      {/* Slide-out Settings Panel */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-20 transform ${
          isSettingsOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        style={{ width: "250px" }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <ul className="space-y-4">
            <li className="text-lg cursor-pointer hover:text-blue-500">Home</li>
            <li className="text-lg cursor-pointer hover:text-blue-500">Marketneed</li>
            <li className="text-lg cursor-pointer hover:text-blue-500">BarCharts</li>
            <li className="text-lg cursor-pointer hover:text-blue-500">More</li>
          </ul>
        </div>
      </div>

      {/* Content overlay when settings are open */}
      {isSettingsOpen && (
        <div
          onClick={toggleSettings}
          className="fixed inset-0 bg-black bg-opacity-25 z-10"
        ></div>
      )}

      {/* Main Content (This will move when settings panel opens) */}
      <div
        className={`transition-transform duration-300 ${
          isSettingsOpen ? "transform translate-x-64" : ""
        }`}
      >
        <div className="p-8 mt-16"> {/* Adjusted top margin */}
          <h1 className="text-3xl">Welcome to FarmNetwork</h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
