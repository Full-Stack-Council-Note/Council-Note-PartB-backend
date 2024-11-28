const mongoose = require('mongoose')

const connectDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/councilnote' || process.env.MONGO_URI )
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDatabase