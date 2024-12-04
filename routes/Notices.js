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
router.get('/', auth, getAllNotices);

// Get a specific article by ID
router.get('/:id/', auth, getNoticeById);

// Create a new article
router.post('/', auth, addNotice);

// Update an article
router.put('/:id/', auth, updateNotice);

// Delete an article Maybe on User profile page?
router.delete('/:id/', auth, deleteNotice);

//filterout with category
router.get('/filter', auth, getNoticesByFilter);

router.post("/:id/comments", auth, addComment );
router.get("/:id/comments", auth, getCommentsByNoticeId);
router.delete("/:id/comments/:commentId", auth, deleteComment);

module.exports = router;