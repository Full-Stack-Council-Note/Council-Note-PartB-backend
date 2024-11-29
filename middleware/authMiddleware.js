const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        // Check if the token exists
        if (!authHeader) {
            return res.status(400).json({ msg: "You are not authorized" });
        }

        // Extract the token by removing 'Bearer ' prefix
        const token = authHeader.split(" ")[1];

        // Verify the token
        const decoded = jwt.verify(token, 'AAAA');
        if (!decoded) {
            return res.status(400).json({ msg: "Invalid token" });
        }

        const user = await User.findOne({ _id: decoded.id });

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

//middleware to check whether or not the user is an admin
const adminOnly = async (request, response, next) => {
    let isAdmin = request.cookies.isAdmin

    if (isAdmin === 'true') {
        next()
    } else {
        next(new Error('Only council staff admins can access this route!'))
    }
}

module.exports = {
    auth, adminOnly
}