const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return bcrypt.hash(password, salt);
};

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { hashPassword, comparePassword };
