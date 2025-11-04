const express = require('express');
const { loginUser, createNewUser, logoutUser, refreshToken, checkAuth } = require('../controllers/authControllers');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const router = express.Router();


router.post('/login', loginUser);

router.post('/sign-up', createNewUser);

router.post('/logout', verifyAccessToken, logoutUser);

router.post('/refresh', refreshToken);

router.get('/check-auth', checkAuth);

module.exports = router;