const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/authMiddleware');
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

// Get all problem posts
//auth, adminOnly,
router.get('/', auth, getAllProblems);

// Get a specific problem post by ID
//add back in auth, adminOnly,
router.get('/:id/', auth, getProblemById);

// Add a problem post
//add back in auth, adminOnly,
router.post('/', addProblem);

// Update a problem post
//auth, adminOnly,
router.patch('/:id/', auth, updateProblem);

// Delete a problem post
//auth, adminOnly,
router.delete('/:id/', auth, deleteProblem);

//filterout with category
router.get('/filter', auth, getProblemsByFilter);

router.post("/:id/comments", auth, addComment );
router.get("/:id/comments", auth, getCommentsByProblemId);
router.delete("/:id/comments/:commentId", auth, deleteComment);

module.exports = router;
