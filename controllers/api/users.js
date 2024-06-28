const bcrypt = require("bcrypt");
const User = require("../../models/User"); // Assuming you have a User model

// Controller function to handle user signup
const signupUser = async (req, res) => {
  try {
    // const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUserEmail = await User.findOne({ email: req.body.email });
    if (existingUserEmail) {
      return res.status(400).json({ message: "User Email already exists" });
    }

    const existingUserName = await User.findOne({
      username: req.body.username,
    });
    if (existingUserName) {
      return res.status(400).json({ message: "User Name already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const login = async (req, res) => {
  //find if useremail exists, const it
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) res.status(400).json({ message: "Email Not Found" });

    const match = await bcrypt.compare(req.body.password, foundUser.password);

    res.status(201).json({
      username: foundUser.username,
      email: foundUser.email,
    });
  } catch {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  signupUser,
  login,
};
