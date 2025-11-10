const express = require('express');
const router = express.Router();
const { getAllCommentsOnPost, createCommentOnPost } = require("../controllers/commentControllers");

router.get("/:id/comments", getAllCommentsOnPost);

router.post("/:id/comments", createCommentOnPost);

module.exports = router