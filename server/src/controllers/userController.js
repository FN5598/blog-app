const User = require("../models/userModel");

//@desc Get all users
//@route GET /api/users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password -__v');
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//@desc Get user by ID
//@route GET /api/users/:id
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const { includeLikedPosts = false } = req.query;

        let projection = '-likedPosts -password -__v';


        if (includeLikedPosts === "true") {
            projection = '-password -__v';
        }

        const user = await User.findById(userId, projection);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No liked posts found for this user"
            });
        }

        if (includeLikedPosts === "true") {
            return res.status(200).json({
                success: true,
                data: user.likedPosts
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getAllUsers,
    getUserById
};