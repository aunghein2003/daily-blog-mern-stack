const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (req.headers && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userId;
    next();
  }

  if (!token) {
    res.status(401);
    throw new Error("No authorization token");
  }
};

module.exports = { protect };
