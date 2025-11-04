const User = require("../model/userModel");


//@desc Get all users
//@route GET /api/users/
//@access public
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(404).json({
                success: true,
                message: "No users found"
            })
        }

        return res.status(200).json({
            success: true,
            message: users
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


module.exports = {
    getAllUsers
}