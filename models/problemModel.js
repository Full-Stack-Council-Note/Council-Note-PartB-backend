const mongoose = require('mongoose');


const ProblemCommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    fullname: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    DateAdded: { type: Date, default: Date.now },
});

const ProblemComment = mongoose.model('ProblemComment', ProblemCommentSchema);
//module.exports = ProblemComment     (here?)

const ProblemSchema = new mongoose.Schema({
    // ProblemTitle: String,                unique: true 
    problemtitle: { type: String, required: true },
    problemdescription: { type: String, required: true },
                                            // turn back on , required: true   (for below)
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    DateAdded: { type: Date, default: Date.now },
    Urgent: {type: Boolean},
    Soon: {type: Boolean},
    IsResolved: {type: Boolean},
    problemphoto: {
        data: Buffer,
        contentType: String,
        filename: String,
 
    },
    ProblemComments: [ProblemCommentSchema],  //Immediate Problem to be solved in next 24 hours? yes or no
    //ImageUpload?
    // UrgentProblem: {type: Boolean},
   // SoonProblem: {type: Boolean},
   //    WorkcrewOnWay: {type: Boolean},
    //WorkcrewAtSite: {type: Boolean},
});

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = {Problem,ProblemComment}