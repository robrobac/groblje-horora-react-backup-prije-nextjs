const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    authorName: {
        type: String,
        required: true
    },
    authorEmail: {
        type: String,
        required: true
    },
    commentMessage: {
        type: String,
        required: true
    },
    reviewId: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('Comment', CommentSchema)

