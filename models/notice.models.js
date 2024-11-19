const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
    NoticeTitle: { type: String },
    NoticeDescription: { type: String },
    DateAdded: { type: Date, default: Date.now },
    //ImageUpload?
});

const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;