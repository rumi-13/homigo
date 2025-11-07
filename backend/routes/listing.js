const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../middlewares/schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middlewares/authenticate.js");
const { isOwner } = require("../middlewares/middlewares.js");
const { validateListing } = require("../middlewares/middlewares.js");

const listingController = require("../controllers/listings.js");
//  Get all listings
router.get("/", asyncWrap(listingController.index));

//  Create new listing
router.post(
  "/new",
  isLoggedIn,
  validateListing,
  asyncWrap(listingController.createNewListing)
);

//  Update listing
router.patch(
  "/edit/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  asyncWrap(listingController.editListing)
);

//  Delete listing
router.delete(
  "/delete/:id",
  isLoggedIn,
  isOwner,
  asyncWrap(listingController.deleteListing)
);

//  Get single listing by ID
router.get("/:id", asyncWrap(listingController.getSingleListing));

module.exports = router;
