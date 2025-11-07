import React from "react";
import homeImg from "../assets/home-img.png"; // make sure path is correct

const Home = () => {
  return (
    <div
      className="relative w-full min-h-screen  flex items-center justify-center bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${homeImg})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4 animate-fade-in">
          Welcome to <span className="text-pink-400">Homigo</span>!
        </h1>
        <p className="text-gray-200 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl animate-fade-in-delay">
          Explore listings, find your perfect stay, and manage your own
          properties — all in one place.
        </p>
      </div>
    </div>
  );
};

export default Home;
