const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../middlewares/schema.js");
const { isLoggedIn } = require("../middlewares/authenticate.js");
const reviewController  = require("../controllers/reviews.js")

// Middleware — validate review data
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  }
  next();
};

//  Create Review
router.post(
  "/",
  isLoggedIn,
  validateReview,
  asyncWrap(reviewController.createReview)
);

//  Get all reviews for a listing
router.get(
  "/",
  asyncWrap(reviewController.getAllReviews)
);

//  Delete Review
router.delete(
  "/:reviewId",
  isLoggedIn,
  asyncWrap(reviewController.destroyReview)
);

module.exports = router;
