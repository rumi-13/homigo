import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";



const SignupLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(location.pathname === "/login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
    setMessage({ type: "", text: "" });
  }, [location.pathname]);

  const validate = () => {
    if (!email.trim() || !password.trim()) {
      setMessage({ type: "error", text: "Email and password are required." });
      return false;
    }
    if (!isLogin && !username.trim()) {
      setMessage({ type: "error", text: "Username is required for signup." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    if (!validate()) return;

    try {
      setLoading(true);
      const url = isLogin ? "/api/login" : "/api/signup";
      const payload = isLogin ? { email, password } : { username, email, password };

      const { data } = await api.post(url, payload);
      setMessage({ type: "success", text: data.message || "Success!" });

      setUsername("");
      setEmail("");
      setPassword("");

      const authRes = await api.get("/api/check-auth");
      if (authRes.data.authenticated) {
        const from = location.state?.from || "/home";
        navigate(from, { replace: true });
      } else {
        setMessage({
          type: "error",
          text: "Session not established. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setMessage({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage({ type: "", text: "" });
    navigate(isLogin ? "/signup" : "/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-pink-50 to-gray-100 px-4 py-12">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8 transition-all duration-300">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>

        {message.text && (
          <div
            className={`text-center text-sm mb-4 py-2 rounded-lg ${
              message.type === "error"
                ? "bg-red-50 text-red-600 border border-red-200"
                : "bg-green-50 text-green-600 border border-green-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 py-2.5 font-semibold text-white rounded-lg shadow-md transition-all duration-300 ${
              loading
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 hover:shadow-lg"
            }`}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleMode}
            className="text-pink-600 hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupLogin;
