const express = require('express')
const Review = require('../models/reviewModel')

const {
    createReview,
    getReview,
    getReviews,
    deleteReview,
    updateReview
} = require('../controllers/reviewsController')

const router = express.Router()


// GET all Reviews
router.get('/reviews/', getReviews)

// GET a SINGLE Review
router.get('/reviews/:id', getReview)

// POST a NEW Review
router.post('/reviews/', createReview)

// DELETE a Review
router.delete('/reviews/:id', deleteReview)

// UPDATE a Review
router.patch('/reviews/:id', updateReview)


module.exports = router