const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rainbowSchema = new Schema ({
    number: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Rainbow", rainbowSchema)