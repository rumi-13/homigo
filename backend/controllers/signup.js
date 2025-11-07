const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: "Registration successful!" });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!user)
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      res.json({
        message: "Login successful",
        user: { username: user.username, email: user.email },
      });
    });
  })(req, res, next);
};

module.exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });
};
