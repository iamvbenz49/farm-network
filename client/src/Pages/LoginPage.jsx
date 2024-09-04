import React from "react";

function LoginPage() {
  // Inline CSS for the animations
  const fadeSlideLeft = {
    opacity: 0,
    transform: 'translateX(-50px) scale(0.8) rotate(-10deg)',
    animation: 'fadeInSlideLeft 1s ease-out forwards',
  };

  const bounceEffect = {
    opacity: 0,
    transform: 'translateY(-20px) rotate(10deg)',
    animation: 'bounceIn 1s ease-out forwards',
  };

  // Keyframes for the animations
  const keyframes = `
    @keyframes fadeInSlideLeft {
      to {
        opacity: 1;
        transform: translateX(0) scale(1) rotate(0deg);
      }
    }

    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: translateY(-20px) rotate(10deg);
      }
      50% {
        opacity: 1;
        transform: translateY(10px) rotate(-5deg);
      }
      100% {
        opacity: 1;
        transform: translateY(0) rotate(0deg);
      }
    }
  `;

  return (
    <div className="h-screen flex">
      {/* Left side with animation */}
      <div className="w-1/2 flex items-center justify-start bg-[rgba(40,48,71,255)] text-white">
        <div className="flex flex-col items-start ml-24">
          <style>{keyframes}</style>
          <h1 style={fadeSlideLeft} className="text-6xl font-bold font-sans mb-4">Farm</h1>
          <h1 style={bounceEffect} className="text-6xl font-bold font-sans">NetWork</h1>
        </div>
      </div>

      {/* Right side with Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 font-sans">
            Welcome Back
          </h2>
          <p className="mb-4 text-sm text-gray-500 font-sans">Please login to your account</p>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2 font-sans">
                Email
              </label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2 font-sans">
                Password
              </label>
              <input
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 font-sans"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


