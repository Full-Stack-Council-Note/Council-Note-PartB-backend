const mongoose = require("mongoose");
const {Notice, NoticeComment} = require("../models/noticeModel");
const Users = require("../models/userModel");
const multer = require('multer')

const storage = multer.memoryStorage()
const file = multer({ storage: storage })

// Get all Notice posts
const getAllNotices = async (req, res) => {
    try {
        const noticePosts = await Notice.find().populate("user", "fullname");
        //const problemPosts = await Notice.find().populate("user", "fullname");
       //const problemPosts = await Notice.find().populate("AddedBy", "fullname", "-password");
        
                                                      //or other word?
        res.json(noticePosts);
    } catch (err) {
        res.status(500).json({ message: "Error occurred finding Notice posts" });
    }
};

// Get a specific Notice post by ID
const getNoticeById = async (req, res) => {
    try {
        const noticePost = await Notice.findById(req.params._id).populate("user", "fullname");
        if (noticePost) res.json(noticePost);
        else res.status(404).json({ message: "Problem post not found" });
    } catch (err) {
        res.status(500).json({ message: "Error occurred finding this Notice post" });
    }
};

// Add a Notice Post
const addNotice = async (req, res) => {
    const { NoticeTitle, NoticeDescription} = req.body;
    const upload = req.file;
                                       //or User?
    //if (!mongoose.Types.ObjectId.isValid(fullname)) {
     //   return res.status(400).json({ message: "Invalid User ID" });
    //}

    try {
        //needed?
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }
        const noticePost = new Notice(req.body).populate("user", "fullname");
        const newNoticePost = await noticePost.save();
        res.status(201).json(newNoticePost);
        //const file = req.file;

        // this bit needed? ! needed? Check if file exists
        //        if (!file) {
        //    return res.status(400).json({ message: 'Feel free to upload a photo of the problem' });
        //}
        if (upload) {
            noticePost.NoticePhoto = {
                filename: file.filename,
                data: file.buffer,
                contentType: file.mimetype,
            };
          }

    } catch (err) {
        res.status(400).json({ message: "processing error occurred" });
    }
};

// Update a Notice Post
const updateNotice = async (req, res) => {
    const { NoticeTitle, NoticeDescription, user, DateAdded, NoticePhoto } = req.body;
    const upload = req.file;

    try {
        const noticePost = await Notice.findByIdAndUpdate(
            req.params.noticeId,
            { NoticeTitle, NoticeDescription, user, DateAdded, NoticePhoto },
            { new: true }
        ).populate("user", "fullname");

        if (noticePost) res.json(noticePost);
        else res.status(404).json({ message: "Notice post not found" });
        if (upload) {
            noticePost.NoticePhoto = {
                filename: file.filename,
                data: file.buffer,
                contentType: file.mimetype,
            };
          }
    } catch (err) {
        res.status(400).json({ message: "error occurred updating notice post" });
    }
};

// Delete a Notice Post
const deleteNotice = async (req, res) => {
    try {
        const noticePost = await Notice.findByIdAndDelete(req.params._id);
        if (noticePost) res.json({ message: "Notice deleted" });
        else res.status(404).json({ message: "Notice post not found" });
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};
const getNoticesByFilter = async (req, res) => {
    //add date? date instead? DateAdded, AddedBy
    const { DatesAdded, fullname } = req.query;
    try {
        let query = {};
        if (DatesAdded) query.DateAdded = DatesAdded;
        if (fullname) query.user = fullname
        //if (tag) query.tags = tag;

        const noticePost = await Notice.find(query).populate("user", "fullname");
        res.json(noticePost);
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};

const addComment = async (req, res) => {
    const { content, user } = req.body;
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    try {
        const noticePost = await Notice.findById(_id);
        if (!noticePost) {
            return res.status(404).json({ message: "Notice Post not found" });
        }

        noticePost.comments.push({ content, AddedBy });
        await noticePost.save();

        res.status(201).json(noticePost);
    } catch (err) {
        res.status(400).json({ message: "processing error occurred" });
    }
};

// Get all comments for a Notice Post
const getCommentsByNoticeId = async (req, res) => {
    try {
        const noticePost = await Notice.findById(req.params._id)
        .populate("comments.user", "fullname");
        if (noticePost) res.json(noticePost.comments);
        else res.status(404).json({ message: "Notice Post not found" });
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};


// Delete a comment
const deleteComment = async (req, res) => {
    const { _id, commentId } = req.params;

    try {
        const noticePost = await Notice.findById(_id);
        if (!noticePost) {
            return res.status(404).json({ message: "Notice Post not found" });
        }

        const commentIndex = noticePost.comments.findIndex(c => c._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        noticePost.comments.splice(commentIndex, 1);
        await noticePost.save();

        res.json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};
module.exports = {
    getAllNotices,
    getNoticeById,
    addNotice,
    updateNotice,
    deleteNotice,
    getNoticesByFilter,
    addComment,
    getCommentsByNoticeId,
    deleteComment
};