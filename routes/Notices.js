const express = require('express');
const router = express.Router();
const {auth, adminOnly} = require('../middleware/authMiddleware');
const {
    getAllNotices,
    getNoticeById,
    addNotice,
    updateNotice,
    deleteNotice,
    getNoticesByFilter,
    addComment,
    getCommentsByNoticeId,
    deleteComment
} = require('../controllers/NoticeCtrl');

// Get all articles
router.get('/', auth, adminOnly, getAllNotices);

// Get a specific article by ID
router.get('/:id', auth, adminOnly, getNoticeById);

// Create a new article
router.post('/', auth, adminOnly, addNotice);

// Update an article
router.put('/:id', auth, adminOnly, updateNotice);

// Delete an article
router.delete('/:id', auth, adminOnly, deleteNotice);

//filterout with category
router.get('/filter', auth, adminOnly, getNoticesByFilter);

router.post("/:problemId/comments", auth, adminOnly, addComment );
router.get("/:problemId/comments", auth, adminOnly, getCommentsByNoticeId);
router.delete("/:problemId/comments/:commentId", auth, adminOnly, deleteComment);

module.exports = router;