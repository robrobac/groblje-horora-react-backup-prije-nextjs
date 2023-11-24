const Review = require('../models/reviewModel')
const mongoose = require('mongoose')

/*
// Get all reviews
// Define a function to fetch reviews and their total count
const fetchReviews = async (query, skip, perPage, sortQuery) => {
    // Use MongoDB queries to fetch reviews and count the total number of documents
    const reviews = await Review.find(query)
        .skip(skip)
        .limit(perPage)
        .sort(sortQuery);
    const totalReviewsCount = await Review.countDocuments(query);

    // Return the fetched reviews and total count
    return { reviews, totalReviewsCount };
};

const getReviews = async (req, res) => {
    try {
        // Destructure query parameters from the request object
        const { sort, order, search, page, perPage } = req.query;

        // Define a function to get the sorting order (-1 for true, 1 for false)
        const getOrder = (orderBy = 'false') => (orderBy === 'true' ? -1 : 1);

        // Calculate the number of documents to skip based on the pagination parameters
        const skip = (page - 1) * perPage;

        let sortQuery;
        // Check if a specific sort field is provided
        if (sort) {
            // Define the sorting criteria with specified sort field and order
            sortQuery = [
                [sort, getOrder(order)],
                ['createdAt', -1], // Default sorting by date created
            ];
        } else {
            // Default sorting by date created if no specific sort field is provided
            sortQuery = [['createdAt', -1]];
        }

        // Define the MongoDB query based on the presence of the search parameter
        const query = search
            ? {
                $or: [
                    { $text: { $search: search } },
                    { reviewTitle: { $regex: new RegExp(`.*${search}.*`, 'i') } },
                ],
            }
            : {};

        // Call the fetchReviews function to retrieve reviews and total count
        const { reviews, totalReviewsCount } = await fetchReviews(query, skip, perPage, sortQuery);

        // Return the reviews and pagination information in the response
        return res.status(200).json({
            reviews,
            totalPages: Math.ceil(totalReviewsCount / perPage),
        });
    } catch (error) {
        // Handle errors by logging and sending an internal server error response
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
*/


// Get all reviews
const getReviews = async (req, res) => {
    const { sort, order, search, page, perPage } = req.query

    const getOrder = (orderBy) => {
        if (orderBy === 'true') {
            return -1
        }
        if (orderBy === 'false') {
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
            .sort({ score: { $meta: 'textScore' } })  // Sort by relevance
        const totalReviewsCount = await Review.countDocuments(reviewsQuery)

        return res.status(200).json({
            reviews,
            totalPages: Math.ceil(totalReviewsCount / perPage)
        })
    } else {
        // Else if there's no Search in the query, continue with sorting and ordering
        if (sort === 'movies.0.rating') {
            // sory by rating
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
                totalPages: Math.ceil(totalReviewsCount / perPage)
            })
        }
        if (sort === 'reviewTitle') {
            // sort by title
            const reviews = await Review.find({})
                .skip(skip)
                .limit(perPage)
                .sort([
                    ['reviewTitle', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            const totalReviewsCount = await Review.countDocuments()

            return res.status(200).json({
                reviews,
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
                totalPages: Math.ceil(totalReviewsCount / perPage)
            })
        }
        if (sort === 'createdAt') {
            // sort by date created
            const reviews = await Review.find({})
                .skip(skip)
                .limit(perPage)
                .sort([
                    ['createdAt', getOrder(order)],
                    [sort, getOrder(order)],
                ]);
            const totalReviewsCount = await Review.countDocuments()

            return res.status(200).json({
                reviews,
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
        let review = {}
        if (movies.length === 1) {
            review = await Review.findOneAndUpdate({ _id: id }, {
                reviewTitle: movies[0].title,
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