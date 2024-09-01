import React from 'react';
import { FiMessageCircle } from 'react-icons/fi'; // Importing icons from react-icons (install if needed)
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Left - Logo/Website Name */}
        <h2 className="text-2xl font-bold text-blue-600">Farm Network</h2>

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
  );
}

export default Navbar;
