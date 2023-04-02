const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rainbowMemoSchema = new Schema ({
    memo: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("RainbowMemo", rainbowMemoSchema)