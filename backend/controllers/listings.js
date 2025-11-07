const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.status(200).json(listings);
};

module.exports.getSingleListing = async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate: {
      path: "author",
      select: "username email", // explicitly include username & email
    },
  })
  .populate("owner", "username email"); // also populate owner if you need
    
    if (!list) throw new ExpressError(404, "Listing not found");
    console.log(list);

    res.status(200).json(list);
  }

module.exports.createNewListing = async (req, res) => {
  const newList = new Listing(req.body);
  newList.owner = req.user._id;
  await newList.save();
  res
    .status(201)
    .json({ message: "Listing created successfully", listing: newList });
};

module.exports.editListing = async (req, res) => {
  const { id } = req.params;
  const updated = await Listing.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new ExpressError(404, "Listing not found");
  res
    .status(200)
    .json({ message: "Listing updated successfully", listing: updated });
};


module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;

    //  Fetch the listing first
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    //  Check ownership
    if (!listing.owner.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Unauthorized: You don't own this listing" });
    }

    //  Authorized → delete
    await Listing.findByIdAndDelete(id);
    res.status(200).json({ message: "Listing deleted successfully" });
  }