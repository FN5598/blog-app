const express = require('express');
const { loginUser, createNewUser, logoutUser, refreshToken } = require('../controllers/authController');
const router = express.Router();


router.post('/login', loginUser);

router.post('/sign-up', createNewUser);

router.post('/logout', logoutUser);

router.post('/refresh', refreshToken);


module.exports = router;