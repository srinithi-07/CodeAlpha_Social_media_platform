const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }

        // Expected format: Bearer <token>
        const token = authHeader.replace("Bearer ", "");

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid token."
            });
        }

        req.user = user;
        next();

    } catch (err) {
        res.status(401).json({
            message: "Authentication failed."
        });
    }
};

module.exports = auth;