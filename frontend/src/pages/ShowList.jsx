import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Review from "../components/Review";
import ReviewList from "../components/ReviewList";

const ShowList = () => {
  const { id } = useParams();
  const [listData, setListData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authRes = await api.get("/api/check-auth");
        setCurrentUser(authRes.data.user);
        setIsLogged(authRes.data.authenticated);

        const listRes = await api.get(`/api/listings/${id}`);
        setListData(listRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/api/listings/delete/${id}`);
      navigate("/home/listings");
    } catch (error) {
      console.error(error);
    }
  };

  if (!listData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading listing details...
        </p>
      </div>
    );
  }

  const isOwner =
    listData?.owner?._id?.toString() === currentUser?._id?.toString();

  return (
    <div className="min-h-screen w-full  flex flex-col items-center px-4 sm:px-6 md:px-8 pt-4 mt-5 pb-12">
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-all duration-300">
        
        {/* Image Header */}
        <div className="relative h-56 sm:h-72 md:h-80 lg:h-[26rem] overflow-hidden">
          <img
            src={listData.image}
            alt={listData.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
          <h1 className="absolute bottom-5 left-6 text-white text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-lg">
            {listData.title}
          </h1>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 flex flex-col gap-5">
          {/* Owner Info */}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3">
            <h2 className="text-gray-800 text-lg sm:text-xl font-semibold">
              Hosted by{" "}
              <span className="text-pink-500 hover:text-pink-600 transition-colors">
                {listData.owner?.username}
              </span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base text-center sm:text-right">
              {listData.location}, {listData.country}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed border-t border-gray-200 pt-4">
            {listData.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between mt-2 border-t border-gray-200 pt-4">
            <p className="text-green-600 font-semibold text-lg sm:text-xl">
              ₹{listData.price}
              <span className="text-gray-400 text-sm font-normal"> / night</span>
            </p>
            {isOwner && (
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/home/listings/edit/${id}`)}
                  className="px-5 py-2 sm:py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm sm:text-base rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-5 py-2 sm:py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="w-full max-w-4xl mt-10 space-y-8">
        
        {isLogged && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-md border border-gray-100">
            <Review />
          </div>
        )}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6">
          <ReviewList currentUser={currentUser?._id} />
        </div>
      </div>
    </div>
  );
};

export default ShowList;
