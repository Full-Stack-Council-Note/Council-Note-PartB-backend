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

// put back auth
router.get('/', getAllNotices);

router.get('/:id/', auth, getNoticeById);

router.post('/addNotice', auth, addNotice);

router.patch('/:id/updateNotice', auth, updateNotice);

router.delete('/:id/deleteNotice', auth, deleteNotice);

//filterout with category
router.get('/filter', auth, getNoticesByFilter);

router.post("/:id/comments", auth, addComment );
router.get("/:id/comments", auth, getCommentsByNoticeId);
router.delete("/:id/comments/:commentId", auth, deleteComment);

module.exports = router;