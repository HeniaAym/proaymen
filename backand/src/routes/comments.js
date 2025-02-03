const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { ensureAuthenticated } = require('../middlewares/auth');

// Define your comment routes here
router.post('/', ensureAuthenticated, commentController.createComment);
router.get('/', commentController.getComments);
router.get('/:id', commentController.getCommentById);
router.delete('/:id', ensureAuthenticated, commentController.deleteComment);

module.exports = router;