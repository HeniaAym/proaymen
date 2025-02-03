const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { ensureAuthenticated } = require('../middlewares/auth');

// Define your post routes here
router.post('/', ensureAuthenticated, postController.createPost);
router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.delete('/:id', ensureAuthenticated, postController.deletePost);

module.exports = router;