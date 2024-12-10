const {User} = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
    register: async (req, res) => {
        try {
            const { fullname, email, password, } = req.body;

            const passwordHash = await bcrypt.hash(password, 12);

            const user = new User({
                fullname,
                email,
                password: passwordHash,
            });

            const token = createToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/auth/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000, //validity of 30 days
            });

            res.json({
                msg: "Registered Successfully!",
                token,
                user: {
                    ...user._doc,
                    password: "",
                },

            });

            await user.save();

            res.json({ msg: "registered" });
            const user_email = await User.findOne({ email });
            if (user_email) {
                return res
                    .status(400)
                    .json({ msg: "This email is already registered." });
            }

            if (password.length < 6) {
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 characters long." });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    changePassword: async (req, res) => {
        try {
            const { oldPassword, newPassword } = req.body;
            //const email = req.body;

           // if (!email) {
           //     return res.status(400).json({ msg: "requested user does not exist." });
            //}
            const user = await User.findOne({ _id: req.user._id });

            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Your password is wrong." });
            }

            if (newPassword.length < 6) {
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 characters long." });
            }

            const newPasswordHash = await bcrypt.hash(newPassword, 12);

            await User.findOneAndUpdate({ _id: req.user._id }, { password: newPasswordHash });

            res.json({ msg: "Password updated successfully." })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    registerAdmin: async (req, res) => {
        try {
            const { fullname, email, password } = req.body;

            const user_email = await User.findOne({ email });
            if (user_email) {
                return res
                    .status(400)
                    .json({ msg: "This email is already registered." });
            }

            if (password.length < 6) {
                return res
                    .status(400)
                    .json({ msg: "Password must be at least 6 characters long." });
            }

            const passwordHash = await bcrypt.hash(password, 12);

            const newUser = new User({
                fullname,
                email,
                password: passwordHash,
  
            });

            await newUser.save();

            res.json({ msg: "Admin Registered Successfully." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    loginfm: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email }).populate(
                "problemslist noticeslist",
                "-password"
            );

            if (!user) {
                return res.status(400).json({ msg: "Email or Password is incorrect." });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Email or Password is incorrect." });
            }

            const token = createToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/auth/refresh_token",
                sameSite: 'lax',
                maxAge: 30 * 24 * 60 * 60 * 100000,
                //maxAge: 30 * 24 * 60 * 60 * 1000, //validity of 30 days
            });

            res.json({
                msg: "Logged in  Successfully!",
                token,
                user: {
                    ...user._doc,
                    password: "",
                },
 
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    adminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log("fd", password);
            const user = await User.findOne({ email });
            console.log("user", user)
            if (!user) {
                return res.status(400).json({ msg: "Email or Password is incorrect." });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Email or Password is incorrect." });
            }

            const token = createToken({ id: user._id });
            const refresh_token = createRefreshToken({ id: user._id });

            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                path: "/auth/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 100000, //validity of 30 days
            });

            res.json({
                msg: "Logged in  Successfully!",
                token,
                user: {
                    ...user._doc,
                    password: "",
                },
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie("refreshtoken", { path: "/auth/refresh_token" });
            return res.json({ msg: "Logged out Successfully." });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;

            if (!rf_token) {
                return res.status(400).json({ msg: "Please login again." });
            }
            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, result) => {
                    if (err) {
                        return res.status(400).json({ msg: "Please login again." });
                    }

                    const user = await User.findById(result._id)
                        .select("-password")
                        .populate("problemslist noticeslist", "-password");

                    if (!user) {
                        return res.status(400).json({ msg: "User does not exist." });
                    }

                    const token = createToken({ id: result._id });
                    res.json({ token, user });
                }
            );
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

const createToken = (payload) => {
    return jwt.sign(payload, "AAAA", {
        expiresIn: "30d",
    });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, "AAAA", {
        expiresIn: "30d",
    });
};

module.exports = authCtrl;