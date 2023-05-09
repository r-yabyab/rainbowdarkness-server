const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rainbowSchema = new Schema ({
    // if user submits decimal, MongoDB stores as a Double
    // if whole number, Int32
    number: {
        type: Number,
        required: true
    },
    userID: {
        type: String
    },
    timeSlept: {
        type: Number
    },
    activities: {
        type: String
    },
    memo: {
        type: String
    },
}, {timestamps: true})


module.exports = mongoose.model("Rainbow", rainbowSchema)