const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
    NoticeTitle: { type: String, required: true, unique: true},
    NoticeDescription: { type: String, required: true },
    DateAdded: { type: Date, default: Date.now },
    //ImageUpload? refer to Pet example?
});

const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;