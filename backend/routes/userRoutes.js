// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser, submitKYC } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');

// //user registration
// router.post('/register', registerUser);

// //  user login
// router.post('/login', loginUser);

// // submitting KYC data (protected route)
// router.post('/kyc/:userId', protect, submitKYC);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, submitKYC } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Middleware to log requests
router.use((req, res, next) => {
  console.log(`[REQUEST LOG] ${req.method} ${req.originalUrl} - Body:`, req.body);
  next();
});

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Submit KYC data (protected route)
router.post("/kyc", protect, submitKYC);

module.exports = router;
