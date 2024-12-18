const express = require('express');
const router = express.Router();
const { registerUser, loginUser, submitKYC } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

//user registration
router.post('/register', registerUser);

//  user login
router.post('/login', loginUser);

// submitting KYC data (protected route)
router.post('/kyc/:userId', protect, submitKYC);

module.exports = router;