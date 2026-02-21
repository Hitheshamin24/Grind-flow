const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    console.log("Decoded token:", decoded);
    console.log("jwt secret:", process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({ success: false, message: e.message });
  }
};
module.exports = authMiddleware;
