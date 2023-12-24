const Review = require('../models/reviewModel')
const mongoose = require('mongoose')
const slugify = require('../helpers/slugify')


// Get all reviews
const getReviews = async (req, res) => {
    const { sort, order, search, page, perPage, filter } = req.query

    const getOrder = (orderBy) => {
        if (orderBy === 'desc') {
            return -1
        }
        if (orderBy === 'asc') {
            return 1
        }
    }

    const skip = (page - 1) * perPage

    if (search) {
        const reviewsQuery = {
            $or: [
                { $text: { $search: search } },
                // { "reviewTitle": { $regex: new RegExp(`.*${search}.*`, 'i') } }
            ],
        }
        //  If SEARCH is in query, do the search.
        const reviews = await Review.find(reviewsQuery)
            .skip(skip)
            .limit(perPage)
            .sort([['createdAt', -1],])
            .sort()  // Sort by relevance
        const totalReviewsCount = await Review.countDocuments(reviewsQuery)

        return res.status(200).json({
            reviews,
            totalItems: totalReviewsCount,
            totalPages: Math.ceil(totalReviewsCount / perPage)
        })
    } else {
        // Else if there's no Search in the query, continue with sorting and ordering
        if (sort === 'movies.0.rating') {
            const typeFilter = filter ? { 'reviewType': filter } : {}
            // sory by rating
            const reviews = await Review.find(typeFilter)
                .skip(skip)
                .limit(perPage)
                .sort([
                    ['reviewType', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            const totalReviewsCount = await Review.countDocuments(typeFilter)

            return res.status(200).json({
                reviews,
                totalItems: totalReviewsCount,
                totalPages: Math.ceil(totalReviewsCount / perPage)
            })
        }
        if (sort === 'reviewTitle') {
            const typeFilter = filter ? { 'reviewType': filter } : {}
            // sort by title
            const reviews = await Review.find(typeFilter)
                .skip(skip)
                .limit(perPage)
                .sort([
                    ['reviewTitle', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            const totalReviewsCount = await Review.countDocuments(typeFilter)

            return res.status(200).json({
                reviews,
                totalItems: totalReviewsCount,
                totalPages: Math.ceil(totalReviewsCount / perPage)
            })
        }
        if (sort === 'reviewType') {
            // sort by type
            const reviews = await Review.find({})
                .skip(skip)
                .limit(perPage)
                .sort([
                    ['reviewType', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            const totalReviewsCount = await Review.countDocuments()

            return res.status(200).json({
                reviews,
                totalItems: totalReviewsCount,
                totalPages: Math.ceil(totalReviewsCount / perPage)
            })
        }
        if (sort === 'createdAt') {
            const typeFilter = filter ? { 'reviewType': filter } : {}
            // sort by date created
            const reviews = await Review.find(typeFilter)
                .skip(skip)
                .limit(perPage)
                .sort([
                    ['createdAt', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            const totalReviewsCount = await Review.countDocuments(typeFilter)

            return res.status(200).json({
                reviews,
                totalItems: totalReviewsCount,
                totalPages: Math.ceil(totalReviewsCount / perPage)
            })
        }
        if (sort === 'updatedAt') {
            // sort by date updated
            const reviews = await Review.find({})
                .skip(skip)
                .limit(perPage)
                .sort([
                    ['updatedAt', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            const totalReviewsCount = await Review.countDocuments()

            return res.status(200).json({
                reviews,
                totalItems: totalReviewsCount,
                totalPages: Math.ceil(totalReviewsCount / perPage)
            })
        }
        if (!sort) {
            // if there's no sort, fetch by date created
            const reviews = await Review.find({})
                .skip(skip)
                .limit(perPage)
                .sort({ createdAt: -1 })
            const totalReviewsCount = await Review.countDocuments()

            return res.status(200).json({
                reviews,
                totalItems: totalReviewsCount,
                totalPages: Math.ceil(totalReviewsCount / perPage)
            })
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
    const { slug } = req.params

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({ error: 'No such review' })
    // }

    const review = await Review.findOne({ slug: slug })

    if (!review) {
        return res.status(404).json({ error: 'No such review' })
    }

    res.status(200).json(review)
}

// Create a new review
const createReview = async (req, res) => {
    const { reviewTitle, movies, comments, likes, contentImages } = req.body

    const slug = slugify(reviewTitle)
    console.log(slug)

    let emptyFields = []

    if (!reviewTitle) {
        emptyFields.push('reviewTitle')
    }

    const existingSlug = await Review.findOne({ slug: slug })
    if (existingSlug) {
        emptyFields.push('titleExists')
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
                reviewTitle,
                slug: slug,
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
                slug: slug,
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

// Update Review
const updateReview = async (req, res) => {
    const { slug } = req.params
    const { id } = req.query

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such review' })
    }

    const { reviewTitle, movies, comments, likes, contentImages } = req.body

    const newSlug = slugify(reviewTitle)
    console.log(newSlug)

    let emptyFields = []

    if (!reviewTitle) {
        emptyFields.push('reviewTitle')
    }

    const existingSlug = await Review.findOne({ slug: newSlug, _id: { $ne: id } })
    if (existingSlug) {
        emptyFields.push('titleExists')
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
        let review = {}
        if (movies.length === 1) {
            review = await Review.findOneAndUpdate({ _id: id }, {
                reviewTitle: movies[0].title,
                slug: newSlug,
                movies,
                comments,
                likes,
                contentImages,
                reviewType: 'single',
            }, { new: true })
        }
        if (movies.length === 4) {
            review = await Review.findOneAndUpdate({ _id: id }, {
                reviewTitle,
                slug: newSlug,
                movies,
                comments,
                likes,
                contentImages,
                reviewType: 'quad',
            }, { new: true })
        }

        // const review = await Review.findOneAndUpdate({ _id: id }, {
        //     reviewTitle, movies, comments, likes, contentImages
        // }, { new: true })

        if (!review) {
            return res.status(404).json({ error: 'No such review' })
        }

        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Count reviews
const countReviews = async (req, res) => {

    const singleReviews = await Review.countDocuments({ reviewType: 'single' })
    const quadReviews = await Review.countDocuments({ reviewType: 'quad' })
    const numberOfReviews = singleReviews + quadReviews
    const numberOfMovies = quadReviews * 4 + singleReviews

    return res.status(200).json({
        singleReviews,
        quadReviews,
        numberOfReviews,
        numberOfMovies
    })
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
    countReviews,
}