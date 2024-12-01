const mongoose = require('mongoose')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
    fullname: {
        required: [true, 'Please enter your full name.'],
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: true,
        trim: true,
        validate: [isEmail, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        unique: true
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    profilephoto: {
        data: Buffer,
        contentType: String,
        filename: String,
 
    },
    about: {
        type: String,
        default: "",
        maxlength: 500,
    },

    problemslist: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'problem'
           //uppercase?
        }
    ],
    noticeslist: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'notice'
           //uppercase?
        }
    ],
})

const User = mongoose.model('User', UserSchema)

module.exports = User 