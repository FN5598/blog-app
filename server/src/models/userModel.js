const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [15, "Username must be not over 15 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters long"]
    },
    refreshToken: {
        type: String
    },
    likedPosts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
}, {
    timestamps: true
})


module.exports = mongoose.model("User", userSchema);