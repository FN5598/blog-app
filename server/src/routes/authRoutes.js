const express = require('express');
const { loginUser, createNewUser, logoutUser, refreshToken, checkAuth } = require('../controllers/authControllers');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User Logged In Successfully
 *       400: 
 *         description: All fields are mandatory
 *       404: 
 *         description: User doesnt exist
 *       401: 
 *         description: Invalid email or password
 *       500: 
 *         description: Failed to Login the user. Server error
 */
router.post('/login', loginUser);


/**
 * @swagger
 * /api/auth/sign-up:
 *   post:
 *     summary: Create new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signed Up Successfully
 *       400: 
 *         description: All fields are mandatory
 *       409: 
 *         description: User already exists under this email
 *       500:
 *         description: Failed to save user to Database and Failed to create new Account. Server Error
 */
router.post('/sign-up', createNewUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the current user by clearing authentication cookies. Requires valid access token in cookies.
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
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
 *                   example: "Logged out successfully"
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: Clears accessToken and refreshToken cookies
 *       401:
 *         description: Not authenticated or invalid token
 *       500:
 *         description: Server error
 */
router.post('/logout', verifyAccessToken, logoutUser);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh Token
 *     description: compares refresh token and refreshes access token.
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Refreshed access token successfully
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
 *                   example: "Refreshed access token successfully"
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: Clears accessToken and refreshToken cookies
 *       401:
 *         description: Refresh token is expired
 *       403: 
 *         description: Invalid or expired refresh token
 *       404:
 *         description: User not found
 *       500:
 *         description: Failed to refresh user token. Server error
 */
router.post('/refresh', refreshToken);

/**
 * @swagger
 * /api/auth/check-auth:
 *   get:
 *     summary: Verify user authentication status
 *     description: Checks if the user is authenticated using the access token cookie.
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User is authenticated"
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *             description: Access token cookie used for authentication
 *       401:
 *         description: Missing or expired access token
 *       403:
 *         description: Invalid access token
 */
router.get('/check-auth', checkAuth);


module.exports = router;