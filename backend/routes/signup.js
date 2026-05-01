const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signup.js");
const { validateUser } = require("../middlewares/middlewares.js");

router.post("/signup", validateUser, signupController.registerUser);
router.post("/login", validateUser, signupController.loginUser);
router.post("/logout", signupController.logoutUser);

module.exports = router;
