import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  // Set document title dynamically
  useEffect(() => {
    document.title = "404 - Page Not Found | Homigo";
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      
      {/* Illustration */}
      <div className="w-64 sm:w-80 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 700 500"
          fill="none"
          className="w-full h-auto"
        >
          <rect width="700" height="500" fill="transparent" />
          <path
            d="M320 370c-50 0-90-40-90-90s40-90 90-90 90 40 90 90-40 90-90 90z"
            fill="#f9a8d4"
            opacity="0.25"
          />
          <path
            d="M460 250c-40 0-72-32-72-72s32-72 72-72 72 32 72 72-32 72-72 72z"
            fill="#f472b6"
            opacity="0.15"
          />
          <path
            d="M150 400c-25 0-45-20-45-45s20-45 45-45 45 20 45 45-20 45-45 45z"
            fill="#ec4899"
            opacity="0.12"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-7xl font-bold"
            fill="#ec4899"
            fontSize="120"
          >
            404
          </text>
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-base sm:text-lg max-w-md mb-8">
        The page you’re looking for doesn’t exist or has been moved.  
        Let’s get you back to exploring amazing stays.
      </p>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/home"
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300"
        >
          🏠 Back to Home
        </Link>
        <Link
          to="/home/listings"
          className="border border-pink-500 text-pink-600 hover:bg-pink-50 font-semibold py-2 px-6 rounded-full shadow-sm transition-all duration-300"
        >
          Explore Listings
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
