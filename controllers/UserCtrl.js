const { User } = require("../models/userModel");
const {Problem,ProblemComment} = require("../models/problemModel");
const {Notice,NoticeComment} = require("../models/noticeModel");
const multer = require('multer')

const storage = multer.memoryStorage()
const file = multer({ storage: storage })

    //needed?
const searchUsers = async (req, res) => {
        try {
            const users = await User.find().select('-password')
 
            //const users = await User.find({
             //   fullname: { $regex: req.query.user.fullname },
            //})
            //    .limit(50)
            //    .select("fullname");

            res.json( users );
        } catch (err) {
            return res.status(500).json({ msg: "processing error occurred" });
        }
};

const getUser= async (req, res) => {

       try {
           const user = await User.findOne( req.params._id).select("-password")
        //.select("-password")
        //.populate("problemslist noticeslist", "-password");
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
            const { fullname, about, profilephoto, ProblemsList, NoticesList } =
                req.body;
            //if (!fullname) {
             //   return res.status(400).json({ msg: "Please add your full name." });
            //}

            await User.findOneAndUpdate(
                //{ _id: req.user._id },
                //{ userId: req.user.userId },
                { _id: req.user._id },
                { fullname, about, profilephoto, ProblemsList, NoticesList }
                //and PostsList or NumberofPosts
            );

            res.json({ msg: "Profile updated successfully." });
            const upload = req.file;
            if (upload) {
                user.profilephoto = {
                    filename: file.filename,
                    data: file.buffer,
                    contentType: file.mimetype,
                };
            }
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

            //await Problem.findOneAndUpdate(
             //   { _id: req.problems._id },
            //    { $push: { problemslist: req.params._id} },
           //     { new: true }
           // );

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
    //const { _id, email } = req.params;

    try {
     // if (!_id) {
     //   return res.status(400).json({ message: "User ID is required" });
      //}
  
      const result = await User.findByIdAndDelete(req.params._id)
      res.json(result)
      if (!result) {
        return res.status(400).json({ message: "User not found" });
      }
  
      //const result = await user.deleteOne();
    } catch (err) {
        res.status(500).json({ message: "processing error occurred" });
    }
};

//router.delete('/:id', auth, (req, res) => {
//    Problem.findByIdAndDelete(req.params.id)
//        .then(() => res.json('Problem deleted.'))
//        .catch(err => res.status(400).json(`Error: ${err}`));
//});

module.exports = {
    searchUsers,
    getUser,
    updateUser,
    UpdateProblemsList,
    UpdateNoticesList,
    deleteProbleminList,
    deleteNoticeinList,
    deleteUser
};
