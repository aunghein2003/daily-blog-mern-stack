const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/helper");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SERCRET, { expiresIn: "30d" });
};

//Desc: Create a User
//Routes: /api/users
//Access: Public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill the credentials");
  }

  //Checking if user already exists
  const existUser = User.find({ email });

  if (existUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hashing Password
  const hashedPassword = hashPassword(password);

  //Create a User
  const user = await User.create({ username, email, password: hashPassword });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
};

//Desc: Login User
//Routes: /api/users/login
//Access: Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.find({ email });

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
  }
};

module.exports = { registerUser, loginUser };
