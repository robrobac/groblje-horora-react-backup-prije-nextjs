const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    coverImage: {
        type: String,
        required: false
    },
    coverImagePath: {
        type: String,
        required: false
    },
    reviewContent: {
        type: String,
        required: false
    },
    imdbLink: {
        type: String,
        required: false
    },
    top25: {
        type: Boolean,
        required: false
    },
    worse20: {
        type: Boolean,
        required: false
    }
})

const CommentSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    commentContent: {
        type: String,
        required: false
    }
}, {
    timestamps: true
})

const ReviewSchema = new Schema({
    reviewTitle: {
        type: String,
        required: true
    },
    movies: [MovieSchema],
    comments: [CommentSchema],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', ReviewSchema)