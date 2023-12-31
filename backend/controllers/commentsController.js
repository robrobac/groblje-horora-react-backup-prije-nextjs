
const Review = require('../models/reviewModel')
const mongoose = require('mongoose')
const slugify = require('../helpers/slugify')


// Create a new comment
const createComment = async (req, res) => {
    const { id } = req.params;
    const { authorName, authorEmail, message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such review' });
    }

    const newComment = {
        authorName,
        authorEmail,
        message,
    };

    try {
        const updatedReview = await Review.findOneAndUpdate(
            { _id: id },
            { $push: { comments: newComment } },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ error: 'No such review' });
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete Comment
const deleteComment = async (req, res) => {
    const { reviewId, commentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reviewId) || !mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(404).json({ error: 'Invalid review or comment ID' });
    }

    try {
        const updatedReview = await Review.findOneAndUpdate(
            { _id: reviewId },
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ error: 'No such review' });
        }

        res.status(200).json(updatedReview);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    createComment,
    deleteComment,
}