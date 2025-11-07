import React, { useState, useEffect } from "react";
import { Star, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const ReviewList = ({ currentUser }) => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/api/listings/${id}/reviews`);
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  const handleDelete = async (reviewId) => {
    try {
      await api.delete(`/api/listings/${id}/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  if (!reviews.length) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-6 text-center text-gray-500 bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl py-8 shadow-sm">
        <p className="text-gray-600 font-medium">
          No reviews yet — be the first to share your experience!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 space-y-5 px-2 sm:px-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-md p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px]"
        >
          {/* Left section: User + Comment */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-base sm:text-lg truncate">
                @{review.author?.username || "Anonymous"}
              </h3>
              <span className="text-xs text-gray-400 sm:hidden">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-gray-600 text-sm sm:text-base mt-2 leading-relaxed break-words">
              {review.comment}
            </p>

            <div className="mt-2 flex items-center justify-between">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={`transition-colors ${
                      star <= review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Date */}
              <p className="hidden sm:block text-xs text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Delete button (visible only to author) */}
          {currentUser?.toString() === review.author?._id?.toString() && (
            <button
              onClick={() => handleDelete(review._id)}
              className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-3 rounded-lg shadow-sm transition-all duration-300 self-start sm:self-center"
            >
              <Trash2 size={16} /> <span className="text-sm">Delete</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
