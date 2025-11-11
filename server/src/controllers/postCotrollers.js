const Post = require("../models/postModel");
const User = require("../models/userModel");

//@desc Get all posts
//@route GET /api/posts
//@access Public
const getAllPosts = async (req, res) => {
    try {
        const { genre, page, limit, includeContent = 'false', author, blog_id, user_id, includeLikes = 'false' } = req.query;

        let query = {};

        if (genre) {
            query.genre = genre
        }

        if (author) {
            query.author = author;
        }

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum

        let projection = '-content -likes';

        if (includeContent === "true") {
            projection = '';
        }

        if (includeLikes === "true") {
            projection = '';
        }

        if (blog_id) {
            const post = await Post.findById(blog_id);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: "Failed to find post id:", blog_id
                })
            }

            const totalLikes = post.likes.length;
            return res.status(200).json({
                success: true,
                totalLikes: totalLikes
            })
        }

        const posts = await Post.find(query, projection)
            .populate('author', 'username email')
            .sort({ created_at: -1 })
            .skip(skip)
            .limit(limitNum);
        const totalPosts = await Post.countDocuments(query);
        const totalPages = Math.ceil(totalPosts / limitNum);


        const postsWithAuthorNames = posts.map((post) => {
            const postObj = post.toObject();
            return {
                ...postObj,
                author_name: post.author ? post.author.username : "Unknown"
            };
        });

        if (!postsWithAuthorNames || postsWithAuthorNames.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found"
            });
        }

        res.status(200).json({
            success: true,
            data: postsWithAuthorNames,
            pagination: {
                currentPage: pageNum,
                totalPages: totalPages,
                totalPosts: totalPosts,
                postPerPage: limitNum,
            },
            filters: {
                genre: genre || "general"
            }
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

        const user = req.user;
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const populatedPost = await newPost.populate('author', 'username email');

        await newPost.save();
        res.status(201).json({
            success: true,
            data: populatedPost,
            message: "Post created successfully"
        });
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
    const { like } = req.query;
    const userId = req.user?.id;

    if (like && userId) {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const userAlreadyLiked = post.likes.includes(req.user.id);

        if (userAlreadyLiked) {
            post.likes = post.likes.filter(userId => userId.toString() !== req.user.id);
            user.likedPosts = user.likedPosts.filter(postId => postId.toString() !== post._id.toString());
        } else {
            post.likes.push(req.user.id);
            user.likedPosts.push(post._id);
        }

        post.likes_count = post.likes.length || 0;
        await post.save();
        await user.save();

        const totalLikes = post.likes.length;

        return res.status(200).json({
            success: true,
            liked: !userAlreadyLiked,
            totalLikes: totalLikes,
            message: userAlreadyLiked ? "Successfully unliked the post" : "Successfully liked the post",
        })
    }

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

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only update your own posts"
            });
        }

        if (introduction) post.introduction = introduction;
        if (title) post.title = title;
        if (content) post.content = content;
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

        // Check if user owns the post
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only delete your own posts"
            });
        }

        await Post.findByIdAndDelete(req.params.id);
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