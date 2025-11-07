import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, User, LogOut, List } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth", { withCredentials: true });
        if (res.data.authenticated) {
          setUser(res.data.user);
        } else {
          navigate("/login", { state: { from: "/profile" }, replace: true });
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login", { state: { from: "/profile" }, replace: true });
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-gray-100">
        <p className="text-pink-600 text-lg sm:text-xl md:text-2xl font-semibold animate-pulse">
          Loading your profile...
        </p>
      </div>
    );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-gray-100 flex flex-col items-center justify-center px-4 py-10 sm:px-6 md:px-8">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-200 w-full max-w-md sm:max-w-lg p-6 sm:p-8 md:p-10 transition-all duration-300">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          Welcome, <span className="text-pink-600">{user.username}</span> 👋
        </h1>

        <div className="space-y-4 text-gray-700 text-sm sm:text-base">
          <div className="flex items-center gap-3">
            <User className="text-pink-500" size={20} />
            <p>
              <strong className="text-gray-800">User ID:</strong> {user._id}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-pink-500" size={20} />
            <p>
              <strong className="text-gray-800">Email:</strong> {user.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <button
            onClick={() => navigate("/home/listings")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 sm:py-3 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            <List size={18} />
            View Listings
          </button>

          <button
            onClick={handleLogout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 sm:py-3 px-6 rounded-lg shadow-md transition-all duration-300"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
