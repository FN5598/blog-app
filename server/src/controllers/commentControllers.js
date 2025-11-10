const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require("../models/commentModel");

const getAllCommentsOnPost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Couldn't find the post"
            });
        }
        // Correct syntax:
        const comments = await Comment.find({
            _id: { $in: post.comments }
        })
            .populate('author', 'username')
            .populate('replies')
            .sort({ created_at: -1 });

        if (!comments || comments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No comments found for this post"
            });
        }

        return res.status(200).json({
            sucess: true,
            message: "Successfully found comments",
            data: comments
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to get comments. Server Error"
        });
    }
}

const createCommentOnPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, content } = req.body;

        if (!userId || !content || !id) {
            return res.status(400).json({
                success: false,
                message: "Cannot comment without all the data"
            });
        }

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Couldn't find the post"
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Couldn't find the user"
            });
        }

        const comment = await Comment.create({
            content: content,
            author: userId,
            post: id
        });

        post.comments.push(comment._id);
        await post.save();

        await comment.populate("author", 'username email');

        return res.status(201).json({
            success: true,
            message: "Comment created successfully",
            data: comment
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to create a comment. Server Error"
        });
    }
}

module.exports = {
    getAllCommentsOnPost,
    createCommentOnPost
}