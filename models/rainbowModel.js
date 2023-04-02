const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rainbowSchema = new Schema ({
    number: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const rainbowMemoSchema = new Schema ({
    memo: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = {
    Rainbow: mongoose.model("Rainbow", rainbowSchema),
    RainbowMemo: mongoose.model("RainbowMemo", rainbowMemoSchema)
}