const mongoose = require("mongoose");
const {Notice, NoticeComment} = require("../models/noticeModel");
const {User} = require("../models/userModel");
const multer = require('multer')

const storage = multer.memoryStorage()
const file = multer({ storage: storage })

// Get all Notice posts
const getAllNotices = async (req, res) => {
    try {
        const  notices = await Notice.find().populate("user", "fullname");

        res.json( notices);
    } catch (err) {
        res.status(500).json({ message: "Error occurred finding Notice posts" });
    }
};

// Get a specific Notice post by ID
const getNoticeById = async (req, res) => {
    try {
        const  notices = await Notice.findOne(req.params._id).populate("user", "fullname");
        res.json({ notices});
        
    } catch (err) {
        res.status(404).json({ message: "Notice post not found" });
        res.status(500).json({ message: "Server error occurred finding this Notice post" });
    }
};

// Add a Notice Post
const addNotice = async (req, res) => {

    try {
        const { NoticeTitle, NoticeDescription} = req.body;
       
        const notices = new Notice({ NoticeTitle, NoticeDescription } );
        //await Notice.create(notices);
        await notices.save();
    
        res.json({ msg: "Notice post added successfully" });
       // const existingUser = await Users.findById(user);
      //  if (!existingUser) {
       //     return res.status(400).json({ message: "User not found" });
       // }

        // this bit needed? ! needed? Check if file exists
        //        if (!file) {
        //    return res.status(400).json({ message: 'Feel free to upload a photo of the notice' });
        //}
        const upload = req.file;
        if (upload) {
            NoticePhoto = {
                filename: file.filename,
                data: file.buffer,
                contentType: file.mimetype,
              }
         }
        
        //if (!mongoose.Types.ObjectId.isValid(User.fullname)) {
         //   return res.status(400).json({ message: "Invalid User ID" });
        //}

    } catch (err) {
        res.status(400).json({ message: "error occurred adding notice post" });
        res.status(500).json({ msg: err.message });
    }
};

// Update a Notice Post             NoticePhoto add back in?
const updateNotice = async (req, res) => {
    const { NoticeTitle, NoticeDescription } = req.body;   

    try {
        await Notice.findOneAndUpdate(
            req.params._id,    
            { NoticeTitle, NoticeDescription },
            { new: true }
        );
        res.json({ msg: "Notice post updated successfully." });
       
        const upload = req.file;
        if (upload) {
            NoticePhoto = {
                filename: file.filename,
                data: file.buffer,
                contentType: file.mimetype,
            };
          }
    } catch (err) {
        res.status(400).json({ message: "error occurred updating notice post" });
        res.status(404).json({ message: "Notice post not found" });
    }
};

// Delete a Notice Post
const deleteNotice = async (req, res) => {
    try {
        await Notice.deleteOne(req.params._id);
        res.json({ message: "Notice post deleted" });
        
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
        res.status(404).json({ message: "Notice post not found" });
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

        const  notices = await Notice.find(req.query).populate("user", "fullname");
        res.json( notices);
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};

const addComment = async (req, res) => {
    const { content, user } = req.body;
    //const { _id } = req.params;

    //if (!mongoose.Types.ObjectId.isValid(fullname)) {
     //   return res.status(400).json({ message: "Invalid User ID" });
    //}

    try {
        const notices = await Notice.findOne(req.params._id);
        if (! notices) {
            return res.status(404).json({ message: "Notice Post not found" });
        }
         //or NoticeComment (referring to schema?)
        notices.NoticeComments.push({ content, user});
        await  notices.save();

        res.json( notices);
    } catch (err) {
        res.status(400).json({ message: "processing error occurred" });
    }
};

// Get all comments for a Notice Post
const getCommentsByNoticeId = async (req, res) => {
    try {
        const  notices = await Notice.findOne(req.params._id).populate("user", "fullname");
        if ( notices) res.json( notices.NoticeComments);
        else res.status(404).json({ message: "Notice Post not found" });
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};


// Delete a comment
const deleteComment = async (req, res) => {
    const { _id, commentId } = req.params;

    try {
        const  notices = await Notice.findById(req.params._id);
        if (! notices) {
            return res.status(404).json({ message: "Notice Post not found" });
        }

        const commentIndex =  notices.NoticeComments.findIndex(c => c._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        notices.NoticeComments.splice(commentIndex, 1);
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