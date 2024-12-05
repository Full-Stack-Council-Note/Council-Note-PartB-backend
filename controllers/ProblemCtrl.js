const mongoose = require("mongoose");
const {Problem,ProblemComment} = require("../models/problemModel");
const {User} = require("../models/userModel");
const multer = require('multer')

const storage = multer.memoryStorage()
const file = multer({ storage: storage })

// Get all Problem posts
const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find().populate("user", "fullname");
        //const problemPosts = await Problem.find().populate("user", "fullname");
       //const problemPosts = await Problem.find().populate("AddedBy", "fullname", "-password");
        
                                                      //or other word?
        res.json(problems);
    } catch (err) {
        res.status(500).json({ message: "Error occurred finding problem posts" });
    }
};

// Get a specific Problem post by ID
const getProblemById = async (req, res) => {
    try {
                                                    //or :problemId  ?
        const problems = await Problem.findOne(req.params._id).populate("user", "fullname");
        res.json({problems});
        if (!problems) {
            return res.status(400).json({ message: "problem post not found" });
          }
    } catch (err) {
        res.status(500).json({ message: "Server error occurred finding this problem post" });
    }
};

// Add a Problem Post
const addProblem = async (req, res) => {
    //const { problemtitle, problemdescription, user, Urgent,Soon, IsResolved,problemphoto } = req.body;
    //const upload = req.file;
                                         //or User?
    //if (!mongoose.Types.ObjectId.isValid(user)) {
     //  return res.status(400).json({ message: "Invalid User ID" });
     //}

    try {
        const { problemtitle, problemdescription, Urgent, Soon, IsResolved, problemphoto } = req.body;
        const problems = new Problem({ problemtitle, problemdescription, Urgent, Soon, IsResolved, problemphoto });
        await problems.save();
                            // need these {}  ?
        res.json({ msg: "Problem post added successfully" });
    
        const upload = req.file;
        if (upload) {
            problemphoto = {
                filename: file.filename,
                data: file.buffer,
                contentType: file.mimetype,
              };
          //return res.status(400).json({ message: 'Feel free to upload a photo of the problem' });
        }

    } catch (err) {
        res.status(400).json({ message: "error occurred adding problem post" });
    }
};

// Update a Problem Post
const updateProblem = async (req, res) => {
    const { problemtitle, problemdescription, Urgent, Soon, IsResolved, problemphoto } = req.body;
    

    try {
        await Problem.findOneAndUpdate(
            
            req.params._id,        
            { problemtitle, problemdescription, Urgent, Soon, IsResolved, problemphoto },
            { new: true }
        );
        res.json({ msg: "Problem post updated successfully." });
        
        const upload = req.file;
        if (upload) {
            problemphoto = {
                filename: file.filename,
                data: file.buffer,
                contentType: file.mimetype,
            };
          }
    } catch (err) {
        res.status(404).json({ message: "Problem post not found" });
        res.status(400).json({ message: "error occurred updating problem post" });
    }

};

// Delete a Problem Post
const deleteProblem = async (req, res) => {
    try {
                                                           //or :problemId  ?
        const problems = await Problem.findByIdAndDelete(req.params._id);
        if (problems) res.json({ message: "Problem deleted" });
        else res.status(404).json({ message: "Problem post not found" });
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};
const getProblemsByFilter = async (req, res) => {
    //add date? date instead? DateAdded, AddedBy
    const { DatesAdded, fullname } = req.query;
    try {
        let query = {};
        if (DatesAdded) query.DateAdded = DatesAdded;
        if (fullname) query.user = fullname
        //if (tag) query.tags = tag;

        const problems = await Problem.find(query).populate("user", "-password");
        res.json(problems);
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};

const addComment = async (req, res) => {
    const { content, fullname } = req.body;
    //const { _id } = req.params;

    //if (!mongoose.Types.ObjectId.isValid(fullname)) {
    //    return res.status(400).json({ message: "Invalid User ID" });
   // }

    try {
        const problems = await Problem.findOne(req.params._id);
        if (!problems) {
            return res.status(404).json({ message: "Problem Post not found" });
        }

        problems.ProblemComments.push({ content, fullname });
        await problems.save();

        res.status(201).json(problems);
    } catch (err) {
        res.status(400).json({ message: "processing error occurred" });
    }
};

// Get all comments for a Problem Post
const getCommentsByProblemId = async (req, res) => {
    try {
        const problems = await Problem.findOne(req.params._id).populate("user", "fullname");
        if (problems) res.json(problems.ProblemComments);
        else res.status(404).json({ message: "Problem Post not found" });
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};


// Delete a comment
const deleteComment = async (req, res) => {
    const { _id, commentId } = req.params;

    try {
        const problems = await Problem.findOne(req.params._id);
        if (!problems) {
            return res.status(404).json({ message: "Problem Post not found" });
        }

        const commentIndex = problems.ProblemComments.findIndex(c => c._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        problems.ProblemComments.splice(commentIndex, 1);
        await problems.save();

        res.json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};
module.exports = {
    getAllProblems,
    getProblemById,
    addProblem,
    updateProblem,
    deleteProblem,
    getProblemsByFilter,
    addComment,
    getCommentsByProblemId,
    deleteComment
};