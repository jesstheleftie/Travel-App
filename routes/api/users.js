const express = require('express');
// const { signupUser } = require('../controllers/users');
const { signupUser } = require('../../controllers/api/users');

const router = express.Router();

// Route for user signup
router.post('/signup', signupUser);

module.exports = router;