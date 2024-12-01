const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemCommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    AddedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    DateAdded: { type: Date, default: Date.now },
});

const ProblemComment = mongoose.model('ProblemComment', ProblemCommentSchema);

const ProblemSchema = new Schema({
    // ProblemTitle: String,
    ProblemTitle: { type: String, required: true, unique: true },
    ProblemDescription: { type: String, required: true },
                                            // turn back on , required: true   (for below)
    AddedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    DateAdded: { type: Date, default: Date.now },
    UrgentOrSoon: {type: Boolean},
    IsResolved: {type: Boolean},
    ProblemPhoto: {
        data: Buffer,
        contentType: String,
        filename: String,
 
    },
    comments: [ProblemCommentSchema],  //Immediate Problem to be solved in next 24 hours? yes or no
    //ImageUpload?
    // UrgentProblem: {type: Boolean},
   // SoonProblem: {type: Boolean},
   //    WorkcrewOnWay: {type: Boolean},
    //WorkcrewAtSite: {type: Boolean},
});

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = {Problem, ProblemComment}