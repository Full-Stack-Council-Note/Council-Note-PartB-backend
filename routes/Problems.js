const express = require('express');
const router = express.Router();
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
router.get('/', getAllProblems);

// Get a specific article by ID
router.get('/:id', getProblemById);

// Create a new article
router.post('/', addProblem);

// Update an article
router.put('/:id', updateProblem);

// Delete an article
router.delete('/:id', deleteProblem);

//filterout with category
router.get('/filter', getProblemsByFilter);

router.post("/:problemId/comments",addComment );
router.get("/:problemId/comments", getCommentsByProblemId);
router.delete("/:problemId/comments/:commentId", deleteComment);

module.exports = router;
