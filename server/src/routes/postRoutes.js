const express = require('express');
const { getAllPosts, createPost, getPostById, updatePost, deletePost } = require('../controllers/postCotrollers');
const { verifyAccessToken } = require('../middleware/verifyAccessToken');
const router = express.Router();

router.get('/', getAllPosts);

router.post('/', createPost);

router.get('/:id', getPostById);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;