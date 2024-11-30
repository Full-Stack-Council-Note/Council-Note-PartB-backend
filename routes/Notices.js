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
router.get('/:noticeId/', auth, adminOnly, getNoticeById);

// Create a new article
router.post('/', auth, adminOnly, addNotice);

// Update an article
router.put('/:noticeId/', auth, adminOnly, updateNotice);

// Delete an article
router.delete('/:noticeId/', auth, adminOnly, deleteNotice);

//filterout with category
router.get('/filter', auth, adminOnly, getNoticesByFilter);

router.post("/:noticeId/comments", auth, adminOnly, addComment );
router.get("/:noticeId/comments", auth, adminOnly, getCommentsByNoticeId);
router.delete("/:noticeId/comments/:commentId", auth, adminOnly, deleteComment);

module.exports = router;