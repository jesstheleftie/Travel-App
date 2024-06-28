const express = require("express");
// const { signupUser } = require('../controllers/users');
const { signupUser, login } = require("../../controllers/api/users");

const router = express.Router();

// Route for user signup
router.post("/signup", signupUser);
router.post("/login", login);

module.exports = router;
