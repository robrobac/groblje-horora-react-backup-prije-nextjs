const Review = require('../models/reviewModel')
const mongoose = require('mongoose')

// Get all reviews
const getReviews = async (req, res) => {
    const reviews = await Review.find({}).sort({ createdAt: -1 })

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
    const { movies, comments, likes } = req.body

    // add doc to db
    try {
        const review = await Review.create({ movies, comments, likes })
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
    })

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
    updateReview
}