import React, { useState } from "react";
import api from "../api/axios";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";

const Review = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleRating = (value) => {
    setRating(value);
    if (errors.rating) setErrors((prev) => ({ ...prev, rating: "" }));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    if (errors.comment) setErrors((prev) => ({ ...prev, comment: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!rating) newErrors.rating = "Please select a rating.";
    if (!comment.trim()) newErrors.comment = "Please write a review.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await api.post(`/api/listings/${id}/reviews`, {
        review: { rating, comment },
      });
      setSuccess("Your review has been posted successfully!");
      setComment("");
      setRating(0);
      setHovered(0);
      setErrors({});
      window.location.reload();
    } catch (error) {
      console.error("Error posting review:", error);
      let message =
        error.response?.data?.message ||
        "Something went wrong while posting your review.";
      if (typeof message === "object") {
        message =
          message.details?.[0]?.message || "An unexpected error occurred.";
      }
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-6 sm:p-8 mx-auto mt-8 border border-gray-100 transition-all duration-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
        Leave a Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Star Rating */}
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="focus:outline-none"
              >
                <Star
                  size={30}
                  className={`transition-all duration-200 ${
                    star <= (hovered || rating)
                      ? "text-yellow-400 fill-yellow-400 scale-110"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating}</p>
          )}
        </div>

        {/* Comment Box */}
        <div>
          <textarea
            placeholder="Share your experience..."
            value={comment}
            onChange={handleCommentChange}
            rows="4"
            className={`w-full border ${
              errors.comment ? "border-red-500" : "border-gray-200"
            } bg-white/60 rounded-xl p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none transition-all duration-200 text-sm sm:text-base`}
          ></textarea>
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto px-8 py-2.5 rounded-xl text-white font-semibold shadow-md transition-all duration-300 ${
              loading
                ? "bg-pink-300 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 hover:shadow-lg"
            }`}
          >
            {loading ? "Posting..." : "Post Review"}
          </button>
        </div>

        {/* Feedback Messages */}
        {errors.submit && (
          <div className="text-center text-red-500 text-sm mt-2">
            {String(errors.submit)}
          </div>
        )}
        {success && (
          <div className="text-center text-green-600 text-sm mt-2 font-medium">
            {success}
          </div>
        )}
      </form>
    </div>
  );
};

export default Review;
