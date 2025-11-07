const Review = require("../models/review.js");
const Listing = require("../models/listing.js"); // ✅ FIXED missing import


module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) throw new ExpressError(404, "Listing not found");

  // create new review
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id; // make logged in user as author
  listing.reviews.push(newReview._id);

  await newReview.save();
  await listing.save();

  res.status(201).json({ message: "New review added", review: newReview });
};


module.exports.getAllReviews = async (req, res) => {
    const { id } = req.params;
       const listing = await Listing.findById(id).populate({
      path: "reviews",
      populate: {
        path: "author",
        select: "username email",
      },
    });
    if (!listing) throw new ExpressError(404, "Listing not found");
    res.status(200).json({ reviews: listing.reviews });
  }

module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "Review deleted successfully" });
  }