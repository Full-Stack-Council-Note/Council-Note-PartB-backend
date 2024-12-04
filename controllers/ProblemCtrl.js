const mongoose = require("mongoose");
const {Problem,ProblemComment} = require("../models/problemModel");
const {User} = require("../models/userModel");
const multer = require('multer')

const storage = multer.memoryStorage()
const file = multer({ storage: storage })

// Get all Problem posts
const getAllProblems = async (req, res) => {
    try {
        const problemPosts = await Problem.find().populate("user", "fullname");
        //const problemPosts = await Problem.find().populate("user", "fullname");
       //const problemPosts = await Problem.find().populate("AddedBy", "fullname", "-password");
        
                                                      //or other word?
        res.json(problemPosts);
    } catch (err) {
        res.status(500).json({ message: "Error occurred finding problem posts" });
    }
};

// Get a specific Problem post by ID
const getProblemById = async (req, res) => {
    try {
                                                    //or :problemId  ?
        const problemPost = await Problem.findById(req.params._id).populate("user", "fullname");
        if (problemPost) res.json(problemPost);
        else res.status(404).json({ message: "Problem post not found" });
    } catch (err) {
        res.status(500).json({ message: "Error occurred finding this problem post" });
    }
};

// Add a Problem Post
const addProblem = async (req, res) => {
    const { problemtitle, problemdescription, user, Urgent,Soon, IsResolved } = req.body;
    //const upload = req.file;
                                         //or User?
    //if (!mongoose.Types.ObjectId.isValid(user)) {
     //  return res.status(400).json({ message: "Invalid User ID" });
     //}

    try {
       // const existingUser = await Users.findById(user);
      //  if (!existingUser) {
       //     return res.status(400).json({ message: "User not found" });
       // }
        //const { problemtitle, problemdescription, UrgentOrSoon, IsResolved} = req.body;
        
        const newProblem = new Problem({ problemtitle, problemdescription, user, Urgent,Soon, IsResolved }).populate("user", "fullname");
        //await problemPost.save();
         
        await newProblem.save();
        res.status(201).json(newProblem);
        //needed?

        

        // this bit needed? ! needed? Check if file exists
        //        if (!file) {
        //    return res.status(400).json({ message: 'Feel free to upload a photo of the problem' });
        //}
        const upload = req.file;
        if (upload) {
            problemPost.problemphoto = {
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
    const { problemtitle, problemdescription, user, UrgentOrSoon, IsResolved, problemphoto } = req.body;
    const file = req.file;

    try {
        const problemPost = await Problem.findByIdAndUpdate(
            req.params._id,
            { problemtitle, problemdescription, user, UrgentOrSoon, IsResolved, problemphoto },
            { new: true }
        ).populate("user", "fullname");

        if (problemPost) res.json(problemPost);
        else res.status(404).json({ message: "Problem post not found" });
        if (file) {
            problemPost.problemphoto = {
                filename: file.filename,
                data: file.buffer,
                contentType: file.mimetype,
            };
          }
    } catch (err) {
        res.status(400).json({ message: "error occurred updating problem post" });
    }

};

// Delete a Problem Post
const deleteProblem = async (req, res) => {
    try {
                                                           //or :problemId  ?
        const problemPost = await Problem.findByIdAndDelete(req.params._id);
        if (problemPost) res.json({ message: "Problem deleted" });
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
        if (fullname) query.AddedBy = fullname
        //if (tag) query.tags = tag;

        const problemPost = await Problem.find(query).populate("AddedBy", "-password");
        res.json(problemPost);
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};

const addComment = async (req, res) => {
    const { content, user } = req.body;
    const { _id } = req.params;

    //if (!mongoose.Types.ObjectId.isValid(fullname)) {
    //    return res.status(400).json({ message: "Invalid User ID" });
   // }

    try {
        const problemPost = await Problem.findById(_id);
        if (!problemPost) {
            return res.status(404).json({ message: "Problem Post not found" });
        }

        problemPost.comments.push({ content, AddedBy });
        await problemPost.save();

        res.status(201).json(problemPost);
    } catch (err) {
        res.status(400).json({ message: "processing error occurred" });
    }
};

// Get all comments for a Problem Post
const getCommentsByProblemId = async (req, res) => {
    try {
        const problemPost = await Problem.findById(req.params._id)
        .populate("comments.AddedBy", "fullname");
        if (problemPost) res.json(problemPost.comments);
        else res.status(404).json({ message: "Problem Post not found" });
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};


// Delete a comment
const deleteComment = async (req, res) => {
    const { _id, commentId } = req.params;

    try {
        const problemPost = await Problem.findById(_id);
        if (!problemPost) {
            return res.status(404).json({ message: "Problem Post not found" });
        }

        const commentIndex = problemPost.comments.findIndex(c => c._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        problemPost.comments.splice(commentIndex, 1);
        await problemPost.save();

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