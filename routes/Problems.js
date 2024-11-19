const express = require('express');
const router = express.Router();
const Problem = require('../models/problem.models');
//const Problem = require('../models/problem.model');

router.post('/add-problem', (req, res) => {
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

router.get('/', (req, res) => {
    Problem.find()
        .then(problems => res.json(problems))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.put('/update-problem/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    Problem.findByIdAndDelete(req.params.id)
        .then(() => res.json('Problem deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;