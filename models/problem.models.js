const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
    // ProblemTitle: String,
    ProblemTitle: { type: String, required: true, unique: true },
    ProblemDescription: { type: String, required: true },
    DateAdded: { type: Date, default: Date.now },
    UrgentProblem: {type: Boolean},
    SoonProblem: {type: Boolean},
    WorkcrewOnWay: {type: Boolean},
    WorkcrewAtSite: {type: Boolean},
    IsResolved: {type: Boolean},
    Comment: { type: String }  //Immediate Problem to be solved in next 24 hours? yes or no
    //ImageUpload?
});

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;