import React from "react";

const ListingCard = ({
  image,
  title,
  description,
  price,
  location,
  country,
  showTax,
}) => {
  return (
    
    <div
      className="
        group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl
        transition-all duration-300 ease-in-out overflow-hidden cursor-pointer
        hover:-translate-y-1 hover:scale-[1.01] border border-gray-100
        flex flex-col h-full
      "
    >

      {/* Image Section */}
      <div className="relative w-full h-56 sm:h-60 md:h-64 lg:h-72 overflow-hidden">
        <img
          src={image || "https://via.placeholder.com/400x300.png?text=No+Image"}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

        {/* Location Tag */}
        <div className="absolute bottom-3 left-4 text-white text-sm font-medium drop-shadow">
          {location && country ? `${location}, ${country}` : "Unknown"}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 truncate group-hover:text-pink-600 transition-colors">
          {title || "Untitled Listing"}
        </h3>

        {/* Optional Description */}
        {description && (
          <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-3 line-clamp-3">
            {description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Price */}
        <div className="flex items-center justify-between mt-auto">
          <p className="text-pink-600 font-semibold text-base sm:text-lg">
            ₹{price}
            {showTax && (
              <span className="text-gray-800 text-xs font-normal ml-1">
                (incl. 18% tax)
              </span>
            )}
          </p>
          <span className="text-gray-400 text-xs sm:text-sm font-normal">
            / night
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
