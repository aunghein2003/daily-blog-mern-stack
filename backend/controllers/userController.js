const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/helper");
const asyncHandler = require("express-async-handler");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//Desc: Create a User
//Routes: /api/users
//Access: Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill the credentials");
  }

  //Checking if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hashing Password
  const hashedPassword = await hashPassword(password);
  console.log(hashedPassword);
  //Create a User
  const user = await User.create({ username, email, password: hashedPassword });
  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
});

//Desc: Login User
//Routes: /api/users/login
//Access: Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill the credentials");
  }

  const user = await User.findOne({ email });

  //Check if user exists
  if (!user) {
    res.status(400);
    throw new Error("User does not exist");
  }

  if (user && comparePassword(password)) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect Password");
  }
});

module.exports = { registerUser, loginUser };
