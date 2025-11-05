const express = require('express');
const { getAllPosts, createPost, getPostById, updatePost, deletePost } = require('../controllers/postCotrollers');
const verifyAccessToken = require('../middleware/verifyAccessToken');
const router = express.Router();

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.use(verifyAccessToken);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;