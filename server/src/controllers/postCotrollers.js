const Post = require("../models/postModel");

//@desc Get all posts
//@route GET /api/posts
//@access Private
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


//@desc Create a new post
//@route POST /api/posts
//@access Private
const createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const newPost = new Post({
            title,
            content,
            author: req.user.id,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


//@desc Update a post
//@route PUT /api/posts/:id
//@access Private
const updatePost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.title = title;
        post.content = content;
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//@desc Get a post by ID
//@route GET /api/posts/:id
//@access Private
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//@desc Delete a post
//@route DELETE /api/posts/:id
//@access Private
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }   
        await post.remove();
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
};