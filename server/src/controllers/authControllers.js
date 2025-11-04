const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

//@desc Login user, req: password, email
//@route POST /api/auth/login
//@access public
const loginUser = async (req, res) => {
    try {
        const { password, email } = req.body;

        if (!password || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            });
        };

        const lowerCaseEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: lowerCaseEmail });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exist"
            });
        };

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        };

        const payload = {
            id: user._id,
            email: user.email
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE });

        user.refreshToken = await bcrypt.hash(refreshToken, 10);
        await user.save();

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Login Successful",
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (err) {
        console.log("Login error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to Login the User",
            error: err.message
        });
    }
}

//@desc Create new user, req: password, email
//@route POST /api/auth/sign-up
//@access public
const createNewUser = async (req, res) => {
    try {
        const { password, email } = req.body;

        if (!password?.trim() || !email?.trim()) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            });
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email adress"
            });
        }

        if (password.length < 6 || password.length > 30) {
            return res.status(400).json({
                success: false,
                message: "Password must be between 6 and 30 characters long"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists under this email"
            });
        };

        const defaultUsername = email.split("@")[0];
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username: defaultUsername,
            password: hashedPassword,
            email: email.toLowerCase()
        });

        if (!newUser) {
            return res.status(500).json({
                success: false,
                message: "Failed to save user to Database"
            });
        }

        const savedUser = await User.findById(newUser._id);
        if (!savedUser) {
            return res.status(500).json({
                success: false,
                message: "User not found in Database after creation"
            });
        }

        const userResponse = {
            id: savedUser._id,
            email: savedUser.email,
            username: savedUser.username,
            createdAt: savedUser.createdAt
        };

        return res.status(200).json({
            success: true,
            message: "Successfully created new account",
            data: userResponse,
            redirectTo: "/login"
        });
    } catch (err) {
        console.log("Sign-up error:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to create new account",
            error: err.message
        });
    };
}

//@desc Logout user
//@route POST /api/auth/logout
//@access private
const logoutUser = async (req, res) => {
    try {
        const id = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "ID is required"
            })
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Failed to logout. No user with that ID found"
            });
        }

        user.refreshToken = null;
        await user.save();

        res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: 'strict',
        })

        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: 'strict',
        })

        res.status(200).json({
            success: true,
            message: "Successfully logged out",
            redirectTo: "/"
        });
    } catch (err) {
        console.log("Logout error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to Logout user",
            error: err.message
        });
    }
}

//@desc Refresh User Access Token 
//@route POST /api/auth/refresh
//@access public
const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            console.log("No refresh token provided 1");
            return res.status(401).json({
                success: false,
                message: "Refresh token is required"
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (err) {
            console.log("Invalid refresh token:", err);
            return res.status(403).json({
                success: false,
                message: "Invalid or expired refresh token"
            });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            console.log("User not found for refresh token");
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.refreshToken) {
            return res.status(403).json({
                success: false,
                message: "Refresh token revoked"
            });
        }

        const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isTokenValid) {
            console.log("Refresh token does not match stored hash");
            return res.status(403).json({
                success: false,
                message: "Invalid refresh token"
            });
        }

        const payload = {
            id: user._id,
            email: user.email
        };

        const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            path: "/",
            maxAge: 15 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Tokens refreshed successfully",
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (err) {
        console.log("Refresh token error", err);
        res.status(500).json({
            success: false,
            message: "Failed to refresh user token",
            error: err.message
        });
    }
}

//@desc Check if user is authorized
//@route GET /api/auth/check-auth
//@access private
const checkAuth = async (req, res) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        console.log("No access token provided 2");
        return res.status(401).json({
            authenticated: false,
            message: "Try refreshing access token"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        res.json({
            authenticated: true,
            user: decoded,
            success: true
        });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                authenticated: false,
                message: "Access token expired"
            });
        }

        return res.status(403).json({
            authenticated: false,
            message: "Invalid token"
        });
    }
}

module.exports = {
    loginUser,
    createNewUser,
    logoutUser,
    refreshToken,
    checkAuth
}