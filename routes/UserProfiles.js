const express = require('express');
const router = express.Router();
const UserProfile = require('../models/userprofile.model');

router.post('/add-userprofile', (req, res) => {
    const { title, content, status } = req.body;

    const newUserProfile = new Notice({
        title,
        content,
        status: status || 'active',
    });

    newUserProfile.save()
        .then(() => res.json('UserProfile added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.get('/', (req, res) => {
    UserProfile.find()
        .then(userprofiles => res.json(userprofiles))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.put('/update-userprofile/:id', (req, res) => {
    UserProfile.findById(req.params.id)
        .then(userprofile => {
            userprofile.title = req.body.title;
            userprofile.content = req.body.content;
            userprofile.status = req.body.status || userprofile.status;
            userprofile.save()
                .then(() => res.json('UserProfile updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.delete('/:id', (req, res) => {
    UserProfile.findByIdAndDelete(req.params.id)
        .then(() => res.json('UserProfile deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;