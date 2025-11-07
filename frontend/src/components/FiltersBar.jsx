import React from "react";

const FiltersBar = ({ isOn, onToggle }) => {
  const filters = [
    { icon: "fa-fire", label: "Trending" },
    { icon: "fa-bed", label: "Rooms" },
    { icon: "fa-mountain-city", label: "Iconic Cities" },
    { icon: "fa-mountain-sun", label: "Mountains" },
    { icon: "fa-fort-awesome", label: "Castles" },
    { icon: "fa-campground", label: "Camping" },
    { icon: "fa-cow", label: "Farms" },
    { icon: "fa-snowman", label: "Arctic" },
    { icon: "fa-umbrella-beach", label: "Beach" },
    { icon: "fa-tree", label: "Forest" },
    { icon: "fa-gem", label: "Luxury" },
    { icon: "fa-mountain", label: "Caves" },
    { icon: "fa-sun-plant-wilt", label: "Desert" },
  ];

  return (
    <div className="w-full bg-white/90 backdrop-blur-sm shadow-md rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between items-center gap-4 transition-all duration-300">
      
      {/* Filters Section */}
      <div className="filters flex flex-wrap justify-center sm:justify-start gap-5 items-center w-full sm:w-auto">
        {filters.map((f, idx) => (
          <div
            key={idx}
            className="filter flex flex-col justify-center items-center text-gray-600 hover:text-pink-600 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <i className={`fa-solid ${f.icon} text-lg sm:text-xl mb-1`}></i>
            <p className="text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap">
              {f.label}
            </p>
          </div>
        ))}
      </div>

      {/* Toggle Section */}
      <div className="flex justify-center sm:justify-end items-center gap-3 w-full sm:w-auto">
        <p className="text-sm sm:text-base font-medium text-gray-700 text-center sm:text-right">
          {isOn ? "Price +18% Tax" : "Base Price"}
        </p>
        <button
          onClick={onToggle}
          aria-label="Toggle tax display"
          className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
            isOn ? "bg-pink-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
              isOn ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default FiltersBar;
