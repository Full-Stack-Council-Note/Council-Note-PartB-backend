const { User } = require("../models/userModel");
const {Problem,ProblemComment} = require("../models/problemModel");
const {Notice,NoticeComment} = require("../models/noticeModel");
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });
    //needed?
const searchpeople = async (req, res) => {
        try {
            const users = await User.find().select('-password')
            //    .limit(50)
            //    .select("fullname");

            res.json( users );
        } catch (err) {
            return res.status(500).json({ msg: "processing error occurred" });
        }
};

const getUser= async (req, res) => {

       try {
           const user = await User.findOne( req.params._id).select("-password").populate("problemslist", "noticeslist");
            res.json( {user} );

        //if (!user) {
        //    return res.status(400).json({ msg: "requested user does not exist." });
       // }
        } catch (err) {
        return res.status(500).json({ msg: "Server error occurred" });
        }
     
};

const updateUser = async (req, res) => {
        try {
            const { fullname, about, ProblemsList, NoticesList } = req.body;
            const profilephoto = req.file;
            upload.single('profilephoto')
            
            //if (!fullname) {
             //   return res.status(400).json({ msg: "Please add your full name." });
            //}

            await User.findOneAndUpdate(
                //{ _id: req.user._id },
                //{ userId: req.user.userId },
                { _id: req.user._id },
                { fullname, about, profilephoto, ProblemsList, NoticesList },
                
                //and PostsList or NumberofPosts
            );

            res.json({ msg: "Profile updated successfully." });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
};

const UpdateProblemsList = async (req, res) => {
        try {
            const problemslist = await Problem.find({
                _id: req.problems._id,
                //problemslist: req.problem._id, PLid, NLid
                problemslist: req.params._id,
            });

            res.json({ problemslist });
            const newproblemslist = await Problem.findOneAndUpdate(
                { _id: req.problems._id },
                {$push: {problemslist: req.params._id}},
                { new: true }
            ).populate("problemslist");


            res.json({ newproblemslist });
        } catch (err) {
            return res.status(500).json({ msg: "problems not found" });
        }
};
const UpdateNoticesList = async (req, res) => {
        try {
            const noticeslist = await Notice.find({
                _id: req.notices._id,
                noticeslist: req.params._id,
            });

            res.json({ noticeslist });
            const newnoticeslist = await Notice.findOneAndUpdate(
                { _id: req.notices._id },
                {$push: {noticeslist: req.params._id}},
                { new: true }
            ).populate("noticeslist");

           // await Notice.findOneAndUpdate(
           //     { _id: req.notices._id },
           //     { $push: { noticeslist: req.params._id } },
           //     { new: true }
           // );

            res.json({ newnoticeslist });
        } catch (err) {
            return res.status(500).json({ msg: "notices not found" });
        }
};

const deleteProbleminList = async (req, res) => {
        try {
            const updatedProblemsList = await Problem.findOneAndUpdate(
                { _id: req.params._id },
                {$pull: { problemslist: req.problems._id }},
                { new: true }).populate("problemslist");

            await Problem.findOneAndUpdate(
                { _id: req.problems._id },
                { $pull: { problemslist: req.params._id } },
                { new: true }
            );

            res.json({ updatedProblemsList });
        } catch (err) {
            return res.status(500).json({ msg: "processing error occurred" });
        }
};
const deleteNoticeinList = async (req, res) => {
        try {
            const updatedNoticesList = await Notice.findOneAndUpdate(
                { _id: req.params._id },
                {$pull: { noticeslist: req.notices._id }},
                { new: true }
            ).populate("noticeslist");
           
            await Notice.findOneAndUpdate(
                { _id: req.notices._id },
                { $pull: { noticeslist: req.params._id} },
                { new: true }
            );

            res.json({ updatedNoticesList });
        } catch (err) {
            return res.status(500).json({ msg: "processing error occurred" });
        }
};
const deleteUser = async (req, res) => {
  
    try { 
      await User.deleteOne(req.user._id)
      res.json({ message: "User deleted successfully" });
      
      //const result = await user.deleteOne();
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
        res.status(400).json({ message: "User not found" });
    }
};


module.exports = {
    searchpeople,
    getUser,
    updateUser,
    UpdateProblemsList,
    UpdateNoticesList,
    deleteProbleminList,
    deleteNoticeinList,
    deleteUser
};
