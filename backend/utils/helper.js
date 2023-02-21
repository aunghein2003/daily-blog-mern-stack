const bcrypt = require("bcryptjs");

const salt = bcrypt.genSalt(5);

const hashPassword = (password) => {
  return bcrypt.hash(password, salt);
};

const comparePassword = (password) => {
  return bcrypt.compare(password, salt);
};

module.exports = { hashPassword, comparePassword };
