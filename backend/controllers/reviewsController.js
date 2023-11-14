const Review = require('../models/reviewModel')
const mongoose = require('mongoose')

// Get all reviews
const getReviews = async (req, res) => {
    const reviews = await Review.find({}).sort({ createdAt: -1 })

    res.status(200).json(reviews)
}

// Get Top25 reviews
const getTop25 = async (req, res) => {
    const reviews = await Review.find({ 'movies.0.top25': true }).sort({ createdAt: -1 })

    res.status(200).json(reviews)
}

// Get Worse20 reviews
const getWorse20 = async (req, res) => {
    const reviews = await Review.find({ 'movies.0.worse20': true }).sort({ createdAt: -1 })

    res.status(200).json(reviews)
}

// Get LatestQuad review
const getLatestQuad = async (req, res) => {
    const reviews = await Review.find({ 'movies': { $size: 4 } }).sort({ createdAt: -1 }).limit(1)

    res.status(200).json(reviews)
}

// Get LatestSingle review
const getLatestSingle = async (req, res) => {
    const reviews = await Review.find({ 'movies': { $size: 1 } }).sort({ createdAt: -1 }).limit(1)

    res.status(200).json(reviews)
}

// Get a single review
const getReview = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such review' })
    }

    const review = await Review.findById(id)

    if (!review) {
        return res.status(404).json({ error: 'No such review' })
    }

    res.status(200).json(review)
}

// Create a new review
const createReview = async (req, res) => {
    const { reviewTitle, movies, comments, likes, contentImages } = req.body

    let emptyFields = []

    if (!reviewTitle) {
        emptyFields.push('reviewTitle')
    }

    movies.forEach((movie, index) => {
        if (!movie.title) {
            emptyFields.push(`movie${index}title`)
        }
        if (!movie.year) {
            emptyFields.push(`movie${index}year`)
        }
        if (!movie.rating) {
            emptyFields.push(`movie${index}rating`)
        }
        if (!movie.reviewContent) {
            emptyFields.push(`movie${index}reviewContent`)
        }
        if (!movie.coverImage) {
            emptyFields.push(`movie${index}coverImage`)
        }
    })

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all the fields.', emptyFields })
    }

    // add doc to db
    try {
        const review = await Review.create({ reviewTitle, movies, comments, likes, contentImages })
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a review
const deleteReview = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such review' })
    }

    const review = await Review.findOneAndDelete({ _id: id })

    if (!review) {
        return res.status(404).json({ error: 'No such review' })
    }

    res.status(200).json(review)
}

// Update a review
const updateReview = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such review' })
    }

    const review = await Review.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { new: true })

    if (!review) {
        return res.status(404).json({ error: 'No such review' })
    }

    res.status(200).json(review)
}


module.exports = {
    createReview,
    getReviews,
    getReview,
    deleteReview,
    updateReview,
    getTop25,
    getWorse20,
    getLatestSingle,
    getLatestQuad,
}