const Review = require('../models/reviewModel')
const mongoose = require('mongoose')

// Get all reviews
const getReviews = async (req, res) => {
    const { sort, order, search } = req.query

    const getOrder = (orderBy) => {
        if (orderBy === 'true') {
            return -1
        }
        if (orderBy === 'false') {
            return 1
        }
    }


    if (search) {
        //  If SEARCH is in query, do the search.
        const reviews = await Review.find({
            $or: [
                { $text: { $search: search } },
                { "reviewTitle": { $regex: new RegExp(`.*${search}.*`, 'i') } }
            ]
        })
            .sort({ score: { $meta: 'textScore' } })  // Sort by relevance
        return res.status(200).json(reviews)
    } else {
        // Else if there's no Search in the query, continue with sorting and ordering
        if (sort === 'movies.0.rating') {
            // sory by rating
            const reviews = await Review.find({})
                .sort([
                    ['reviewType', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            res.status(200).json(reviews)
        }
        if (sort === 'reviewTitle') {
            // sort by title
            const reviews = await Review.find({})
                .sort([
                    ['reviewTitle', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            res.status(200).json(reviews)
        }
        if (sort === 'reviewType') {
            // sort by type
            const reviews = await Review.find({})
                .sort([
                    ['reviewType', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            res.status(200).json(reviews)
        }
        if (sort === 'createdAt') {
            // sort by date created
            const reviews = await Review.find({})
                .sort([
                    ['createdAt', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            res.status(200).json(reviews)
        }
        if (sort === 'updatedAt') {
            // sort by date updated
            const reviews = await Review.find({})
                .sort([
                    ['updatedAt', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            res.status(200).json(reviews)
        }
        if (!sort) {
            // if there's no sort, fetch by date created
            const reviews = await Review.find({}).sort({ createdAt: -1 })
            res.status(200).json(reviews)
        }
    }
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
        let review = {}
        if (movies.length === 1) {
            review = await Review.create({
                reviewTitle: movies[0].title,
                movies,
                comments,
                likes,
                contentImages,
                reviewType: 'single',
            })
        }
        if (movies.length === 4) {
            review = await Review.create({
                reviewTitle,
                movies,
                comments,
                likes,
                contentImages,
                reviewType: 'quad',
            })
        }
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

// // Update a review
// const updateReview = async (req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: 'No such review' })
//     }

//     const review = await Review.findOneAndUpdate({ _id: id }, {
//         ...req.body
//     }, { new: true })

//     if (!review) {
//         return res.status(404).json({ error: 'No such review' })
//     }

//     res.status(200).json(review)
// }

// Update Review
const updateReview = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such review' })
    }

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

    try {
        const review = await Review.findOneAndUpdate({ _id: id }, {
            reviewTitle, movies, comments, likes, contentImages
        }, { new: true })

        if (!review) {
            return res.status(404).json({ error: 'No such review' })
        }

        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
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