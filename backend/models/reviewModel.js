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
    coverImagePath: {
        type: String,
        required: true
    },
    reviewContent: {
        type: String,
        required: true
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
    },
}, {
    timestamps: true
})

const ReviewSchema = new Schema({
    reviewTitle: {
        type: String,
        required: true
    },
    contentImages: {
        type: Array,
        required: false,
    },
    movies: [MovieSchema],
    reviewType: {
        type: String,
        required: true
    },
    comments: [CommentSchema],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
    timestamps: true
})

ReviewSchema.index({
    reviewTitle: 'text'
})
module.exports = mongoose.model('Review', ReviewSchema)