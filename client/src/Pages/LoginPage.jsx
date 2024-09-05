import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  // New animation styles
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

  // Keyframes for new animations
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
  const [loginError, setLoginError] = useState(""); // To track invalid login attempts
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", { username: email, password: password });
      const data = res.data;

      if (data.message === "Invalid Login") {
        setLoginError("Invalid email or password. Please try again."); // Set the error message
        return;
      }

      setLoginError(""); // Clear any previous errors if login is successful

      if (data.usertype === "farmer") {
        navigate("/farmer");
      } else if (data.usertype === "warehouse") {
        navigate("/warehouse")
      } else {
        navigate("/error")
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
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2 font-sans">
                Password
              </label>
              <input
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 font-sans text-lg"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
