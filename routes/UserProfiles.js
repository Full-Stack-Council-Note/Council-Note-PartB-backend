const express = require('express');
const router = express.Router();
const UserProfile = require('../models/userprofile.models');
//const UserProfile = require('../models/userprofile.model');
const {
    jwtInHeader, adminOnly
} = require('../middleware/UserMiddleware')
                                     //add async?
router.post('/add-userprofile', jwtInHeader, (req, res) => {
    const { title, content, status } = req.body;

    const newUserProfile = new Notice({
        //specify or define these?
        title,
        content,
        status: status || 'active',
    });

    newUserProfile.save()
        .then(() => res.json('UserProfile added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.get('/:id', jwtInHeader, (req, res) => {
    UserProfile.findById(req.params.id)
        .then(userprofile => res.json(userprofile))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.put('/update-userprofile/:id', jwtInHeader, (req, res) => {
    UserProfile.findById(req.params.id)
        .then(userprofile => {
            //specify or define these?
            userprofile.title = req.body.title;
            userprofile.content = req.body.content;
            userprofile.status = req.body.status || userprofile.status;
            userprofile.save()
                .then(() => res.json('UserProfile updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.delete('/:id', jwtInHeader, (req, res) => {
    UserProfile.findByIdAndDelete(req.params.id)
        .then(() => res.json('UserProfile deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;