import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil, Image as ImageIcon, DollarSign, MapPin, Home } from "lucide-react";

const NewList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    location: "",
    country: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth", { withCredentials: true });
        setIsAuthenticated(res.data.authenticated);
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsAuthenticated(false);
      } finally {
        setLoadingAuth(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loadingAuth && !isAuthenticated) {
      navigate("/login", { state: { from: location.pathname }, replace: true });
    }
  }, [loadingAuth, isAuthenticated, navigate, location.pathname]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.price || formData.price <= 0) newErrors.price = "Enter a valid price.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post("/api/listings/new", formData, { withCredentials: true });
      navigate(res.data.redirectUrl || "/home/listings");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login", { state: { from: location.pathname }, replace: true });
      } else {
        console.error(err);
      }
    }
  };

  if (loadingAuth)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-gray-100">
        <p className="text-pink-600 text-lg sm:text-xl font-semibold animate-pulse">
          Checking login status...
        </p>
      </div>
    );

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-gray-100 flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
        <span className="text-pink-600">Create</span> a New Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8 space-y-6"
      >
        {/* TITLE */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            <Pencil size={16} className="inline text-pink-500 mr-1" />
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            className={`w-full border rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none transition-all ${
              errors.title
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-pink-400"
            }`}
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            placeholder="Enter description"
            rows="3"
            className={`w-full border rounded-lg p-3 text-gray-800 placeholder-gray-400 resize-none focus:outline-none transition-all ${
              errors.description
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-pink-400"
            }`}
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* IMAGE URL */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            <ImageIcon size={16} className="inline text-pink-500 mr-1" />
            Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="Enter image URL"
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            <DollarSign size={16} className="inline text-pink-500 mr-1" />
            Price (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            className={`w-full border rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none transition-all ${
              errors.price
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-pink-400"
            }`}
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* LOCATION */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            <MapPin size={16} className="inline text-pink-500 mr-1" />
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            className={`w-full border rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none transition-all ${
              errors.location
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-pink-400"
            }`}
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* COUNTRY */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            <Home size={16} className="inline text-pink-500 mr-1" />
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="country"
            placeholder="Enter country"
            className={`w-full border rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none transition-all ${
              errors.country
                ? "border-red-500 focus:ring-2 focus:ring-red-400"
                : "border-gray-300 focus:ring-2 focus:ring-pink-400"
            }`}
            value={formData.country}
            onChange={handleChange}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2.5 sm:py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Submit Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewList;
