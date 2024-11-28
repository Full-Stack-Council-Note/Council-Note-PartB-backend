const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    AddedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    DateAdded: { type: Date, default: Date.now },
});

const NoticeSchema = new Schema({
    NoticeTitle: { type: String, required: true, unique: true},
    NoticeDescription: { type: String, required: true },
    AddedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    DateAdded: { type: Date, default: Date.now },
    NoticePhoto: {
        data: Buffer,
        contentType: String,
        filename: String,

    },
    comments: { CommentSchema }
    //ImageUpload? refer to Pet example?
});

const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;