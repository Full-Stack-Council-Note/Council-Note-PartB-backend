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

// Get all problem posts
//auth, adminOnly,
router.get('/', getAllProblems);

// Get a specific problem post by ID
//add back in auth, adminOnly,
router.get('/:id/', getProblemById);

// Add a problem post
//add back in auth, adminOnly,
router.post('/', addProblem);

// Update a problem post
//auth, adminOnly,
router.put('/:id/', updateProblem);

// Delete a problem post
//auth, adminOnly,
router.delete('/:id/', deleteProblem);

//filterout with category
router.get('/filter', auth, adminOnly, getProblemsByFilter);

router.post("/:id/comments", auth, adminOnly, addComment );
router.get("/:id/comments", auth, adminOnly, getCommentsByProblemId);
router.delete("/:id/comments/:commentId", auth, adminOnly, deleteComment);

module.exports = router;
