const express = require('express');
const router = express.Router();
const Notice = require('../models/notice.models');
//const Notice = require('../models/notice.model');
const {
    jwtInHeader, adminOnly
} = require('../middleware/UserMiddleware')
                                     //add async?

router.post('/add-notice', jwtInHeader, (req, res) => {
    const { title, content, status } = req.body;

    const newNotice = new Notice({
        title,
        content,
        status: status || 'active',
    });

    newNotice.save()
        .then(() => res.json('Notice added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.get('/', jwtInHeader, (req, res) => {
    Notice.find()
        .then(notices => res.json(notices))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.get('/:id', jwtInHeader, (req, res) => {
    Notice.find()
        .then(notice => res.json(notice))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.put('/update-notice/:id', jwtInHeader, (req, res) => {
    Notice.findById(req.params.id)
        .then(notice => {
            notice.title = req.body.title;
            notice.content = req.body.content;
            notice.status = req.body.status || notice.status;
            notice.save()
                .then(() => res.json('Notice updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.delete('/:id', jwtInHeader, (req, res) => {
    Notice.findByIdAndDelete(req.params.id)
        .then(() => res.json('Notice deleted.'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;