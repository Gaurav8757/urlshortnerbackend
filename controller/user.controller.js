// controllers
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/userSchema.js";
import dotenv from "dotenv";
dotenv.config();
const { SECRET } = process.env;

// ###################### userRegister ######################### //
export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user with the given email already exists
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({
        status: "User Already Exists",
        message: "User with this email already exists.",
      });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({
      status: "User Registered Successfully",
      message: {
        newUser,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "Error during registration",
      message: err.message,
    });
  }
};
// ############################## login code ##########################
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (!exists) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Password check
    const isValidPassword = await bcrypt.compare(password, exists.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: exists._id }, SECRET);
    res.json({
      User: exists,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// secured session
export const securedHomepage = (req, res) => {
  res.json({ message: `Welcome to the secured homepage, ${req.user.userId}!` });
};


// Logout route
export const logout = (req, res) => {
  const token = req.headers["authorization"];
  // In-memory token blacklist (for demonstration purposes)
  const tokenBlacklist = new Set();
  if (!token) {
    return res
      .status(400)
      .json({ error: "Bad Request: Token missing in the request headers" });
  }

  // Add the token to the blacklist
  tokenBlacklist.delete(token);

  res.json({ message: "Logout successful" });
};


