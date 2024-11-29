const User = require("../models/userModel");
const Problem = require("../models/problemModel");
const Notice = require("../models/noticeModel");


    //needed?
const searchUser = async (req, res) => {
        try {
            const users = await User.find({
                fullname: { $regex: req.query.fullname },
            })
                .limit(10)
                .select("fullname");

            res.json({ users });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
};

const getUser = async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
                .select("-password")
                .populate("-password");
                          //number of posts or list of their posts
            if (!user) {
                return res.status(400).json({ msg: "requested user does not exist." });
            }

            res.json({ user });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
};

const updateUser = async (req, res) => {
        try {
            const { fullname, about, profilephoto, ProblemsList, NoticesList } =
                req.body;
            if (!fullname) {
                return res.status(400).json({ msg: "Please add your full name." });
            }

            await User.findOneAndUpdate(
                { _id: req.user._id },
                { fullname, about, profilephoto, ProblemsList, NoticesList }
                //and PostsList or NumberofPosts
            );

            res.json({ msg: "Profile updated successfully." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
};

const UpdateProblemsList = async (req, res) => {
        try {
            const problem = await Problem.find({
                _id: req.params.id,
                problemslist: req.problem._id,
            });

            res.json({ problem });
            const newProblem = await Problem.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: {
                        problemslist: req.problem._id,
                    },
                },
                { new: true }
            ).populate("problemslist");

            await Problem.findOneAndUpdate(
                { _id: req.problem._id },
                { $push: { problemslist: req.params.id } },
                { new: true }
            );

            res.json({ newProblem });
        } catch (err) {
            return res.status(500).json({ msg: "problems not found" });
        }
};
const UpdateNoticesList = async (req, res) => {
        try {
            const notice = await Notice.find({
                _id: req.params.id,
                noticeslist: req.notice._id,
            });

            res.json({ notice });
            const newNotice = await Notice.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $push: {
                        noticeslist: req.notice._id,
                    },
                },
                { new: true }
            ).populate("noticeslist");

            await Notice.findOneAndUpdate(
                { _id: req.notice._id },
                { $push: { noticeslist: req.params.id } },
                { new: true }
            );

            res.json({ newNotice });
        } catch (err) {
            return res.status(500).json({ msg: "notices not found" });
        }
};

const deleteProblem = async (req, res) => {
        try {
            const updatedProblemsList = await Problem.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: { problemslist: req.problem._id },
                },
                { new: true }
            ).populate("problemslist");

            await Problem.findOneAndUpdate(
                { _id: req.problem._id },
                { $pull: { problemslist: req.params.id } },
                { new: true }
            );

            res.json({ updatedProblemsList });
        } catch (err) {
            return res.status(500).json({ msg: "processing error occurred" });
        }
};
const deleteNotice = async (req, res) => {
        try {
            const updatedNoticesList = await Notice.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $pull: { noticeslist: req.notice._id },
                },
                { new: true }
            ).populate("noticeslist");

            await Problem.findOneAndUpdate(
                { _id: req.notice._id },
                { $pull: { noticeslist: req.params.id } },
                { new: true }
            );

            res.json({ updatedNoticesList });
        } catch (err) {
            return res.status(500).json({ msg: "processing error occurred" });
        }
};
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) res.json({ message: "user deleted" });
        else res.status(404).json({ message: "user not found" });
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
    searchUser,
    getUser,
    updateUser,
    UpdateProblemsList,
    UpdateNoticesList,
    deleteProblem,
    deleteNotice,
    deleteUser
};
