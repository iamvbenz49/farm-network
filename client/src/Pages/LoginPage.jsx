import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Import eye icons

function LoginPage() {
  const zoomInRotate = {
    opacity: 0,
    transform: 'scale(0.5) rotate(-45deg)',
    animation: 'zoomInRotate 1.5s ease-out forwards',
  };

  const floatIn = {
    opacity: 0,
    transform: 'translateY(50px)',
    animation: 'floatIn 2s ease-out forwards 0.5s',
  };

  const keyframes = `
    @keyframes zoomInRotate {
      0% {
        opacity: 0;
        transform: scale(0.5) rotate(-45deg);
      }
      50% {
        opacity: 0.5;
        transform: scale(0.75) rotate(-20deg);
      }
      100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }

    @keyframes floatIn {
      0% {
        opacity: 0;
        transform: translateY(50px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Farmer");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(email === ""||password === "") {
        setLoginError("Enter Relevant details")
        return;
      }
      const res = await axios.post("http://localhost:5000/login", { gmail: email, password: password, userType: userType });
      const data = res.data;
      

      Cookies.set('userType', 'Farmer'); 
      Cookies.set('accessToken', data.accessToken); 

      console.log("data", data)
      if (data.message === "Invalid Login") {
        setLoginError("Invalid email or password. Please try again."); 
        return;
      }

      setLoginError(""); 

      if (data.userType === "Farmer") {
        navigate("/farmer");
      } else if (data.userType === "warehouse") {
        navigate("/warehouse");
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <style>{keyframes}</style>

      {/* Left side with animation */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex flex-col items-center text-center">
          <h1 style={zoomInRotate} className="text-7xl font-bold font-sans mb-6">
            Farm Network
          </h1>
          <p style={floatIn} className="text-xl font-light max-w-md">
            Your gateway to smart and efficient farming solutions.
          </p>
        </div>
      </div>

      {/* Right side with Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-12 shadow-lg">
        <div className="w-full max-w-lg">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 font-sans text-center">
            Welcome Back
          </h2>
          <p className="mb-6 text-sm text-gray-500 font-sans text-center">
            Sign in to continue to your account
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2 font-sans">
                User Type
              </label>
              <select
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 font-sans text-lg"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="Farmer">Farmer</option>
                <option value="Market">Market</option>
                <option value="Transport">Transport</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2 font-sans">
                Email
              </label>
              <input
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 font-sans text-lg"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-8 relative"> {/* Set relative positioning */}
              <label className="block text-gray-700 text-sm font-bold mb-2 font-sans">
                Password
              </label>
              <input
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 font-sans text-lg"
                type={showPassword ? "text" : "password"} // Toggle between text and password
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button" // Prevent form submission
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 font-sans text-lg"
            >
              Login
            </button>
          </form>

          {/* Conditionally render the error message */}
          {loginError && (
            <p className="mt-4 text-red-500 text-center font-sans">
              {loginError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
