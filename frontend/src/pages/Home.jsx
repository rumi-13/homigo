import React from "react";

const Home = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-white to-gray-50">
      {/* Subtle decorative shapes (map-inspired, globe outline, etc) */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute top-0 right-0 w-1/2 opacity-20 transform translate-x-1/4 -translate-y-1/4"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="300" cy="300" r="280" stroke="#D4A0B3" strokeWidth="8" />
          {/* Add more subtle lines/paths to suggest a globe or map grid */}
          <path d="M20 300h560" stroke="#D4A0B3" strokeWidth="4" />
          <path d="M300 20v560" stroke="#D4A0B3" strokeWidth="4" />
        </svg>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-pink-300 opacity-15 rounded-full blur-3xl transform translate-x-[-20%] translate-y-20%"></div>
      </div>

      {/* Dark overlay for text clarity */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-pink-500">Homigo</span>!
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl">
          Explore listings, find your perfect stay, and manage your own properties — all in one place.
        </p>
      </div>
    </div>
  );
};

export default Home;
