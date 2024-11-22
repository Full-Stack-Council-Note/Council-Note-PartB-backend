const express = require('express');
const router = express.Router();
const Problem = require('../models/problem.models');
//const Problem = require('../models/problem.model');
const {
    jwtInHeader, adminOnly
} = require('../middleware/UserMiddleware')
                                     //add async?

router.post('/add-problem', jwtInHeader, (req, res) => {
    const { title, content, status } = req.body;

    const newProblem = new Notice({
        title,
        content,
        status: status || 'active',
    });

    newProblem.save()
        .then(() => res.json('Problem added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.get('/', jwtInHeader, (req, res) => {
    Problem.find()
        .then(problems => res.json(problems))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.get('/:id', jwtInHeader, (req, res) => {
    Problem.find()
        .then(problem => res.json(problem))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.put('/update-problem/:id', jwtInHeader, (req, res) => {
    Problem.findById(req.params.id)
        .then(problem => {
            problem.title = req.body.title;
            problem.content = req.body.content;
            problem.status = req.body.status || problem.status;
            problem.save()
                .then(() => res.json('Problem updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.delete('/:id', jwtInHeader, (req, res) => {
    Problem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Problem deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;