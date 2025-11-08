// Load environment variables only in development
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const User = require("./models/user.js");

// Routers
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const signupRouter = require("./routes/signup.js");

const app = express();
const PORT = process.env.PORT || 8080;
const dbUrl = process.env.ATLASDB_URL;
const isProduction = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);
// CORS FIX — allow both environments
app.use(
  cors({
    origin: [
      "http://localhost:5173",            // local dev frontend
      "https://homigo-386u.onrender.com"  // production frontend (Render)
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(dbUrl)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB Error:", err));

// Session Configuration
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.error("Session Store Error:", err);
});

app.use(
  session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction, // only secure in HTTPS (Render)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Debug helper
app.use((req, res, next) => {
  res.locals.currUser = req.user;
  next();
});

// Routes
app.use("/api/listings", listingRouter);
app.use("/api/listings/:id/reviews", reviewRouter);
app.use("/api", signupRouter);

// Auth check
app.get("/api/check-auth", (req, res) => {
  res.json({ authenticated: !!req.user, user: req.user || null });
});

//  Serve Frontend only in production (Render)
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  //  Fix for Express 5
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });

}


// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  console.error("Error:", message);
  res.status(statusCode).json({ statusCode, message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${isProduction ? "production" : "development"} mode`);
});
