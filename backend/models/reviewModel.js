const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    reviewContent: {
        type: String,
        required: true
    },
    imdbLink: {
        type: String,
        required: true
    }
})

const CommentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    commentContent: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const ReviewSchema = new Schema({
    movies: [MovieSchema],
    comments: [CommentSchema],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', ReviewSchema)