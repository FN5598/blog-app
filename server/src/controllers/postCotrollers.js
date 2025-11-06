const Post = require("../models/postModel");
const User = require("../models/userModel");

//@desc Get all posts
//@route GET /api/posts
//@access Public
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username email');

        const postsWithAuthorNames = await Promise.all(posts.map(async (post) => ({
            ...post.toObject(),
            author_name: post.author ? post.author.username : "Unknown"
        })));

        if (!postsWithAuthorNames) {
            return res.status(404).json({
                success: false,
                message: "No posts found"
            });
        }

        res.status(200).json({
            success: true,
            data: postsWithAuthorNames
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


//@desc Create a new post
//@route POST /api/posts
//@access Private
const createPost = async (req, res) => {
    const { title, content, genre, introduction } = req.body;

    if (!title || !content || !genre || !introduction) {
        return res.status(400).json({
            success: false,
            message: "All fields (title, content, genre, introduction) are required"
        });
    }

    if (title.length > 100 || content.length > 10000 || introduction.length > 300) {
        return res.status(400).json({
            success: false,
            message: "One or more fields exceed their maximum length"
        });
    }

    try {
        const newPost = new Post({
            title,
            content,
            genre,
            introduction,
            author: req.user.id,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


//@desc Update a post
//@route PUT /api/posts/:id
//@access Private
const updatePost = async (req, res) => {
    const { title, content, introduction } = req.body;

    if (!title && !content && !introduction) {
        return res.status(400).json({
            success: false,
            message: "At least one field (title, content, introduction) must be provided for update"
        });
    }

    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        post.introduction = introduction;
        post.title = title;
        post.content = content;
        post.updated_at = Date.now();
        await post.save();

        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

//@desc Get a post by ID
//@route GET /api/posts/:id
//@access Public
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'username email');

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        console.error("Get post by ID error:", error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

//@desc Delete a post
//@route DELETE /api/posts/:id
//@access Private
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        await post.remove();
        res.json({
            success: true,
            message: "Post deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
};