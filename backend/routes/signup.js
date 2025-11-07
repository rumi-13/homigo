const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signup.js");

router.post("/signup", signupController.registerUser);
router.post("/login", signupController.loginUser);
router.post("/logout", signupController.logoutUser);

module.exports = router;
