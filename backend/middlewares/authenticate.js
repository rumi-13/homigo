// middleware/isLoggedIn.js
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // user is authenticated → continue
  }

  // Save original URL they were trying to access
  req.session.returnTo = req.originalUrl;
  console.log("User not logged in. Saving path:", req.originalUrl);

  // Send 401 (frontend will handle redirect to login)
  return res.status(401).json({ message: "Login required" });
}

module.exports = { isLoggedIn };


