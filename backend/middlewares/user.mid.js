import jwt from "jsonwebtoken";
import config from "../config.js";

function userAuthenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.JWT_USER_PASSWORD);

        // set cookie (optional)
        const cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        };

        req.userId = decoded.id;

        next();

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid token." });
    }
}

export default userAuthenticateToken;