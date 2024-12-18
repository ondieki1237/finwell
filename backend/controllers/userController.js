const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); 

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const user = new User({
    name,
    email,
    password,
  });
  await user.save();
  const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
    expiresIn: "1h",
  });
  res.status(201).json({ message: "User registered successfully", token });
};
//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = user.generateToken();
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Submit kmow your customer form
const submitKYC = async (req, res) => {
  try {
    const { profession, contact, country } = req.body;
    const userId = req.user._id; 

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.kycData = { profession, contact, country };
    await user.save();
    return res.status(200).json({ message: "KYC data submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while submitting KYC data." });
  }
};



module.exports = {
  registerUser,
  loginUser,
  submitKYC,
};
