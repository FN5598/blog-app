const express = require('express');
const { getAllPosts, createPost, getPostById, updatePost, deletePost } = require('../controllers/postCotrollers');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const router = express.Router();

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all blog posts
 *     description: Retrieve a list of all blog posts with author information
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter posts by genre/category
 *         example: "technology"
 *     responses:
 *       200:
 *         description: Successfully retrieved posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostsResponse'
 *             example:
 *               success: true
 *               data:
 *                 - _id: "507f1f77bcf86cd799439011"
 *                   title: "Understanding React Hooks"
 *                   content: "React hooks provide a way to use state and lifecycle features in functional components..."
 *                   genre: "technology"
 *                   author:
 *                     _id: "507f1f77bcf86cd799439012"
 *                     username: "john_doe"
 *                     email: "john@example.com"
 *                   author_name: "john_doe"
 *                   likes_count: 25
 *                   comments_count: 8
 *                   reposts_count: 3
 *                   created_at: "2024-01-15T10:30:00.000Z"
 *                   updated_at: "2024-01-15T10:30:00.000Z"
 *                 - _id: "507f1f77bcf86cd799439013"
 *                   title: "The Future of AI"
 *                   content: "Artificial intelligence is transforming industries at an unprecedented pace..."
 *                   genre: "technology"
 *                   author:
 *                     _id: "507f1f77bcf86cd799439014"
 *                     username: "jane_smith"
 *                     email: "jane@example.com"
 *                   author_name: "jane_smith"
 *                   likes_count: 42
 *                   comments_count: 15
 *                   reposts_count: 7
 *                   created_at: "2024-01-14T15:45:00.000Z"
 *                   updated_at: "2024-01-14T15:45:00.000Z"
 *       404:
 *         description: No posts found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "No posts found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: "Server error"
 */
router.get('/', getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a specific blog post by ID
 *     description: Retrieve a specific blog post with author information. (Public access - no authentication required)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     title:
 *                       type: string
 *                       example: "Understanding React Hooks in 2024"
 *                     content:
 *                       type: string
 *                       example: "React hooks have revolutionized how we write functional components..."
 *                     genre:
 *                       type: string
 *                       example: "technology"
 *                     introduction:
 *                       type: string
 *                       example: "A deep dive into React hooks and modern React development patterns."
 *                     author:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439012"
 *                         username:
 *                           type: string
 *                           example: "john_doe"
 *                         email:
 *                           type: string
 *                           example: "john@example.com"
 *                     likes_count:
 *                       type: integer
 *                       example: 15
 *                     comments_count:
 *                       type: integer
 *                       example: 3
 *                     reposts_count:
 *                       type: integer
 *                       example: 2
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:30:00.000Z"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:30:00.000Z"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Post not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.get('/:id', getPostById);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new blog post
 *     description: Create a new blog post. (Authentication required via cookies)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []  # This will show the lock icon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - genre
 *               - introduction
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *                 description: Post title
 *                 example: "Understanding React Hooks in 2024"
 *               content:
 *                 type: string
 *                 maxLength: 10000
 *                 description: Post content
 *                 example: "React hooks have revolutionized how we write functional components..."
 *               genre:
 *                 type: string
 *                 enum: [technology, politics, health, environment, sports, general]
 *                 description: Post category
 *                 example: "technology"
 *               introduction:
 *                 type: string
 *                 maxLength: 300
 *                 description: Brief introduction
 *                 example: "A deep dive into React hooks and modern React development patterns."
 *           example:
 *             title: "The Future of Artificial Intelligence"
 *             content: "Artificial intelligence is rapidly evolving and transforming various industries..."
 *             genre: "technology"
 *             introduction: "Exploring the latest advancements in AI and their impact on society."
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439011"
 *                 title:
 *                   type: string
 *                   example: "The Future of Artificial Intelligence"
 *                 content:
 *                   type: string
 *                   example: "Artificial intelligence is rapidly evolving..."
 *                 genre:
 *                   type: string
 *                   example: "technology"
 *                 introduction:
 *                   type: string
 *                   example: "Exploring the latest advancements in AI..."
 *                 author:
 *                   type: string
 *                   example: "507f1f77bcf86cd799439012"
 *                 likes_count:
 *                   type: integer
 *                   example: 0
 *                 comments_count:
 *                   type: integer
 *                   example: 0
 *                 reposts_count:
 *                   type: integer
 *                   example: 0
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T10:30:00.000Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T10:30:00.000Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All fields (title, content, genre, introduction) are required"
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Not authenticated"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.post('/', verifyAccessToken, createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a blog post
 *     description: Update an existing blog post. User can only update their own posts. (Authentication required via cookies)
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []  # This will show the lock icon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 100
 *               content:
 *                 type: string
 *                 maxLength: 10000
 *               introduction:
 *                 type: string
 *                 maxLength: 300
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: No fields provided for update
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Forbidden - user doesn't own the post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.put('/:id', verifyAccessToken, updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a blog post
 *     description: Delete a specific blog post. User can only delete their own posts. (Authentication required via cookies)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []  # This will show the lock icon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Post deleted"
 *       401:
 *         description: Not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Not authenticated"
 *       403:
 *         description: Forbidden - user doesn't own the post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "You can only delete your own posts"
 *       404:
 *         description: Post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Post not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */
router.delete('/:id', verifyAccessToken, deletePost);

module.exports = router;