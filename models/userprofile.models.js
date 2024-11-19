const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userprofileSchema = new Schema({
    FullName: { type: String, required: true },
    About: { type: String },
});

const UserProfile = mongoose.model('UserProfile', userprofileSchema);

module.exports = UserProfile;