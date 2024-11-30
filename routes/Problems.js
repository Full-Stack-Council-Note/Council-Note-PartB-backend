const express = require('express');
const router = express.Router();
const {auth, adminOnly} = require('../middleware/authMiddleware');
const {
    getAllProblems,
    getProblemById,
    addProblem,
    updateProblem,
    deleteProblem,
    getProblemsByFilter,
    addComment,
    getCommentsByProblemId,
    deleteComment
} = require('../controllers/ProblemCtrl');

// Get all articles
router.get('/', auth, adminOnly, getAllProblems);

// Get a specific article by ID
//add back in auth, adminOnly,
router.get('/:problemId/', getProblemById);

// Create a new article
//add back in auth, adminOnly,
router.post('/', addProblem);

// Update an article
router.put('/:problemId/', auth, adminOnly, updateProblem);

// Delete an article
router.delete('/:problemId/', auth, adminOnly, deleteProblem);

//filterout with category
router.get('/filter', auth, adminOnly, getProblemsByFilter);

router.post("/:problemId/comments", auth, adminOnly, addComment );
router.get("/:problemId/comments", auth, adminOnly, getCommentsByProblemId);
router.delete("/:problemId/comments/:commentId", auth, adminOnly, deleteComment);

module.exports = router;
