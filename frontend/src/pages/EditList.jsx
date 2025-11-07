import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Pencil, MapPin, Image as ImageIcon, DollarSign, Home } from "lucide-react";

const EditList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

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

  useEffect(() => {
    if (!isAuthenticated || loadingAuth) return;
    const fetchListing = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`, { withCredentials: true });
        setFormData({
          title: response.data.title || "",
          description: response.data.description || "",
          image: response.data.image || "",
          price: response.data.price || "",
          location: response.data.location || "",
          country: response.data.country || "",
        });
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
  }, [id, isAuthenticated, loadingAuth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/listings/edit/${id}`, formData, { withCredentials: true });
      navigate("/home/listings");
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
      else console.error("Error updating listing:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8 space-y-6 transition-all duration-300"
      >
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
          <span className="text-pink-600">Edit</span> Listing
        </h1>

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
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            placeholder="Describe your listing..."
            rows="3"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none transition-all"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* IMAGE */}
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
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            value={formData.price}
            onChange={handleChange}
          />
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
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            value={formData.location}
            onChange={handleChange}
          />
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
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2.5 sm:py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Update Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditList;
