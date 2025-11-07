import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" border-t border-gray-200 text-gray-700 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10">
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8 text-center md:text-left">

          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-pink-600 mb-2">Homigo!</h2>
            <p className="text-sm text-gray-500 mb-4">
              Find your perfect stay anywhere in the world.
            </p>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Homigo. All rights reserved.
            </p>
          </div>

          

          {/* Social Media Icons */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-semibold text-lg mb-3 text-gray-800">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full hover:bg-pink-100 transition">
                <i className="fa-brands fa-facebook text-xl hover:text-pink-600"></i>
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-pink-100 transition">
                <i className="fa-brands fa-instagram text-xl hover:text-pink-600"></i>
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-pink-100 transition">
                <i className="fa-brands fa-x-twitter text-xl hover:text-pink-600"></i>
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-pink-100 transition">
                <i className="fa-brands fa-linkedin text-xl hover:text-pink-600"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
