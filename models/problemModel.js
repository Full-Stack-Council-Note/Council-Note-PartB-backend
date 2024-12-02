const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemCommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    AddedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    DateAdded: { type: Date, default: Date.now },
});

const ProblemComment = mongoose.model('ProblemComment', ProblemCommentSchema);
//module.exports = ProblemComment     (here?)

const ProblemSchema = new Schema({
    // ProblemTitle: String,
    problemtitle: { type: String, required: true, unique: true },
    problemdescription: { type: String, required: true },
                                            // turn back on , required: true   (for below)
    AddedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    DateAdded: { type: Date, default: Date.now },
    UrgentOrSoon: {type: Boolean},
    IsResolved: {type: Boolean},
    problemphoto: {
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