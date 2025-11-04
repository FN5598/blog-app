const jwt = require('jsonwebtoken');

const verifyAccessToken = (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated",
                authenticated: false
            });
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("Token verification failed", err.message);
        return res.status(403).json({
            success: false,
            message: "Invalid or expired refresh token",
            authenticated: false
        })
    }
}

module.exports = verifyAccessToken;