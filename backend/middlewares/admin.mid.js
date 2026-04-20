import jwt from "jsonwebtoken";
import config from "../config.js";

function adminAuthenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // 🔥 ADD THIS CHECK
  if (!token || token === "undefined" || token === "null") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_ADMIN_PASSWORD);

    req.adminId = decoded.id;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}
export default adminAuthenticateToken;