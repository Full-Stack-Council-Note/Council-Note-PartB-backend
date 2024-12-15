const mongoose = require('mongoose');

const NoticeCommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    DateAdded: { type: Date, default: Date.now },
});

const NoticeComment = mongoose.model('NoticeComment', NoticeCommentSchema);

const NoticeSchema = new mongoose.Schema({
    NoticeTitle: { type: String, required: true, unique: true},
    NoticeDescription: { type: String, required: true },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    DateAdded: { type: Date, default: Date.now },
    NoticePhoto: {
        type: String,

    },
    NoticeComments:  [NoticeCommentSchema ]
    
});

const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = {Notice,NoticeComment};