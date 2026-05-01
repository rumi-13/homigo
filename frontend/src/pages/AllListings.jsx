import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import ListingCard from "../components/ListingCard";
import FiltersBar from "../components/FiltersBar";

const AllListings = () => {
  const [listings, setListings] = useState([]);
  const [showTax, setShowTax] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllListings = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/listings");
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllListings();
  }, []);

  const calculatePrice = (price) => {
    if (!showTax) return price;
    return (price * 1.18).toFixed(2);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 flex flex-col items-center px-4 sm:px-6 md:px-8 pt-4 md:pt-6">
      {/* Header & Filter section */}
      <div className="w-full max-w-7xl bg-white/70 backdrop-blur-md shadow-sm border border-gray-100 rounded-2xl px-5 sm:px-8 py-6 mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight">
            Explore Listings
          </h1>
          <p className="text-gray-500 text-sm sm:text-base text-center sm:text-right">
            Discover your next stay with <span className="text-pink-500 font-medium">Homigo</span>
          </p>
        </div>

        <FiltersBar isOn={showTax} onToggle={() => setShowTax(!showTax)} />
      </div>

      {/* Grid Container */}
      <div className="w-full max-w-7xl pb-16">
        {loading ? (
          /* Skeleton Loader Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/90 rounded-2xl overflow-hidden shadow-sm animate-pulse border border-gray-100">
                <div className="h-52 sm:h-56 md:h-60 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : listings.length === 0 ? (
          /* Empty State - Only shows if NOT loading and NO listings */
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <i className="fa-solid fa-house-circle-xmark text-gray-400 text-5xl mb-4"></i>
            <p className="text-gray-600 text-lg font-medium">No listings available right now.</p>
            <p className="text-gray-400 text-sm mt-1">Try adding one or check back later.</p>
          </div>
        ) : (
          /* Actual Listings Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-fade-in">
            {listings.map((list) => (
              <Link
                key={list._id}
                to={`/home/listings/${list._id}`}
                className="group transform transition duration-300 hover:-translate-y-1 hover:scale-[1.01]"
              >
                <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full">
                  <div className="relative h-52 sm:h-56 md:h-60 overflow-hidden">
                    <img
                      src={list.image || "https://via.placeholder.com/400x300.png?text=No+Image"}
                      alt={list.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-3 left-4 text-white text-sm font-medium drop-shadow">
                      {list.location}, {list.country}
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate group-hover:text-pink-600 transition-colors">
                      {list.title}
                    </h2>
                    <p className="text-gray-800 font-bold text-base mt-1">
                      {showTax ? (
                        <>₹{calculatePrice(list.price)} <span className="text-gray-500 text-xs">(incl. 18% tax)</span></>
                      ) : (
                        <>₹{list.price}</>
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllListings;
