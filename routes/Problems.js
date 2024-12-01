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
//auth, adminOnly,
router.get('/', getAllProblems);

// Get a specific article by ID
//add back in auth, adminOnly,
router.get('/:id/', getProblemById);

// Create a new article
//add back in auth, adminOnly,
router.post('/', addProblem);

// Update an article
//auth, adminOnly,
router.put('/:id/', updateProblem);

// Delete an article
//auth, adminOnly,
router.delete('/:id/', deleteProblem);

//filterout with category
router.get('/filter', auth, adminOnly, getProblemsByFilter);

router.post("/:id/comments", auth, adminOnly, addComment );
router.get("/:id/comments", auth, adminOnly, getCommentsByProblemId);
router.delete("/:id/comments/:commentId", auth, adminOnly, deleteComment);

module.exports = router;
