const express = require('express');
const router = express.Router();
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
router.get('/', getAllNotices);

// Get a specific article by ID
router.get('/:id', getNoticeById);

// Create a new article
router.post('/', addNotice);

// Update an article
router.put('/:id', updateNotice);

// Delete an article
router.delete('/:id', deleteNotice);

//filterout with category
router.get('/filter', getNoticesByFilter);

router.post("/:problemId/comments",addComment );
router.get("/:problemId/comments", getCommentsByNoticeId);
router.delete("/:problemId/comments/:commentId", deleteComment);

module.exports = router;