import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const res = await api.get("/api/check-auth");
        setIsLogged(res.data.authenticated);
        setCurrentUser(res.data.user || null);
      } catch (error) {
        console.error("Navbar auth check failed:", error);
        setIsLogged(false);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthStatus();
  }, [location.pathname]);

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-5 md:px-8 py-2 sm:py-3 md:py-4">
        
        {/* Left: Logo */}
        <Link
          to="/home"
          className="flex items-center space-x-2 text-pink-600 font-semibold text-lg sm:text-xl md:text-2xl"
        >
          <i className="fa-solid fa-house text-pink-500 text-xl sm:text-2xl"></i>
          <span className="leading-none mt-1">Homigo</span>
        </Link>

        {/* Center: Search bar (hidden on mobile) */}
        <div className="hidden sm:flex flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search destinations"
              className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white px-4 py-1 rounded-full hover:bg-pink-600 transition-colors">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>

        {/* Right: Desktop links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10 text-gray-700 font-medium">
          <Link to="/home/listings" className="hover:text-pink-600 transition-colors">
            Explore
          </Link>
          {isLogged ? (
            <>
              <Link to="/home/listings/new" className="hover:text-pink-600 transition-colors">
                Add Listing
              </Link>
              <Link
                to="/home/profile"
                className="hover:text-pink-600 transition-colors flex items-center space-x-1"
              >
                <i className="fa-solid fa-user text-pink-500"></i>
                <span>{currentUser?.username || "Profile"}</span>
              </Link>
            </>
          ) : (
            <Link to="/login" className="hover:text-pink-600 transition-colors">
              Login
            </Link>
          )}
        </div>

        {/* Mobile: Auth Links (visible only on mobile/tablet) */}
        <div className="md:hidden flex items-center space-x-4 text-gray-700 font-medium">
          {isLogged ? (
            <>
              <Link to="/home/listings/new" className="text-pink-600">
                <i className="fa-solid fa-plus text-xl"></i>
              </Link>
              <Link to="/home/profile" className="text-pink-600">
                <i className="fa-solid fa-user text-xl"></i>
              </Link>
            </>
          ) : (
            <Link to="/login" className="text-pink-600 text-sm sm:text-base font-semibold">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
