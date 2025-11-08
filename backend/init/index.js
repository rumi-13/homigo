const mongoose = require("mongoose");
const initData = require("./data.js"); // 👈 CommonJS require
const Listing = require("../models/listing.js"); // 👈 Adjust path if needed

const MONGO_URL = process.env.A

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connection successful!");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

// Seed function
const initDb = async () => {
  try {
    await Listing.deleteMany({});
    console.log("✅ Old listings deleted.");

    initData.data =initData.data.map((obj)=>({...obj, owner: "68fde69ea6596b2132be18fa"}))
    await Listing.insertMany(initData.data);
    console.log("✅ New listings inserted.");

    mongoose.connection.close(); // close the connection
    console.log("🚀 Database seeding complete. Connection closed.");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
    mongoose.connection.close();
  }
};

// Run the seeder
initDb();
