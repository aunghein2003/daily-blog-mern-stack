const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hash(password, salt);
};

const comparePassword = (password) => {
  return bcrypt.compare(password, salt);
};

module.exports = { hashPassword, comparePassword };
