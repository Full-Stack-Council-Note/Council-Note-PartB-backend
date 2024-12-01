const mongoose = require("mongoose");
const {Notices, NoticeComments} = require("../models/noticeModel");
const User = require("../models/userModel");
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Get all Notice posts
const getAllNotices = async (req, res) => {
    try {
        const noticePosts = await Notices.find().populate("AddedBy", "-password");
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
        const noticePost = await Notices.findById(req.params._id).populate("AddedBy", "-password");
        if (noticePost) res.json(noticePost);
        else res.status(404).json({ message: "Problem post not found" });
    } catch (err) {
        res.status(500).json({ message: "Error occurred finding this Notice post" });
    }
};

// Add a Notice Post
const addNotice = async (req, res) => {
    const { NoticeTitle, NoticeDescription, AddedBy, DateAdded, NoticePhoto} = req.body;
    const file = req.file;
                                       //or User?
    if (!mongoose.Types.ObjectId.isValid(fullname)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    try {
        //needed?
        //const existingUser = await Users.findById(fullname);
        //if (!existingUser) {
        //    return res.status(400).json({ message: "User not found" });
        //}
        const file = req.file;

        // this bit needed? ! needed? Check if file exists
        //        if (!file) {
        //    return res.status(400).json({ message: 'Feel free to upload a photo of the problem' });
        //}
        if (file) {
          return res.status(400).json({ message: 'Feel free to upload a photo for this notice' });
        }
        const noticePost = new Notices({  NoticeTitle, NoticeDescription, AddedBy, DateAdded, NoticePhoto: {filename: file.filename, data: file.buffer, contentType: file.mimetype,} });
        const newNoticePost = await noticePost.save();
        res.status(201).json(newNoticePost);
    } catch (err) {
        res.status(400).json({ message: "processing error occurred" });
    }
};

// Update a Notice Post
const updateNotice = async (req, res) => {
    const { NoticeTitle, NoticeDescription, AddedBy, DateAdded, NoticePhoto } = req.body;
    const file = req.file;

    try {
        const noticePost = await Notices.findByIdAndUpdate(
            req.params.noticeId,
            { NoticeTitle, NoticeDescription, AddedBy, DateAdded, NoticePhoto },
            { new: true }
        ).populate("AddedBy", "-password");

        if (noticePost) res.json(noticePost);
        else res.status(404).json({ message: "Notice post not found" });
        if (file) {
            noticePost.NoticePhoto = {
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
        const noticePost = await Notices.findByIdAndDelete(req.params._id);
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
        if (fullname) query.AddedBy = fullname
        //if (tag) query.tags = tag;

        const noticePost = await Notices.find(query).populate("AddedBy", "-password");
        res.json(noticePost);
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};

const addComment = async (req, res) => {
    const { content, AddedBy } = req.body;
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(fullname)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    try {
        const noticePost = await Notices.findById(_id);
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
        const noticePost = await Notices.findById(req.params._id)
        .populate("comments.AddedBy", "fullname");
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
        const noticePost = await Notices.findById(_id);
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