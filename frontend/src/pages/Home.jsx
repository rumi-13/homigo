import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

// Import images
import img1 from "../assets/filip-chmielecki.webp";
import img2 from "../assets/mikhail-nilov.webp";
import img3 from "../assets/navlakha.webp";
import img4 from "../assets/steven-van.webp";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);

  const images = [img1, img2, img3, img4];

  useEffect(() => {
    // Check auth status
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/check-auth");
        setIsLogged(res.data.authenticated);
      } catch (error) {
        setIsLogged(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();

    // Carousel interval
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) return null;

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-hidden flex items-center justify-center">
      
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            {/* Enhanced Gradient Overlay for maximum text contrast */}
            <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 [text-shadow:_0_4px_12px_rgba(0,0,0,0.6)]">
          Welcome to <span className="text-pink-500 [text-shadow:_0_4px_12px_rgba(0,0,0,0.4)]">Homigo</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
          Discover unique stays and unforgettable experiences around the world.
        </p>

        {isLogged ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/home/listings"
              className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Browse Listings
            </Link>
            <Link
              to="/home/listings/new"
              className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all shadow-lg"
            >
              Add Property
            </Link>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-pink-700 transition-all transform hover:scale-105 shadow-xl inline-block"
          >
            Start Your Journey
          </Link>
        )}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex ? "bg-pink-500 w-8" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Home;
