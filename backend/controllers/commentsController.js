const Comment = require('../models/commentModel')
const mongoose = require('mongoose')
const slugify = require('../helpers/slugify')


// Create a new comment
const createComment = async (req, res) => {
    const { authorName, authorEmail, commentMessage, reviewId } = req.body

    try {
        const comment = await Comment.create({ authorName, authorEmail, commentMessage, reviewId })
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// get Comments
const getComments = async (req, res) => {
    const { id } = req.params
    const comments = await Comment.find({ reviewId: id }).sort({ createdAt: 1 })
    return res.status(200).json(comments)
}

// Count comments
const countComments = async (req, res) => {
    const { id } = req.params
    const comments = await Comment.countDocuments({ reviewId: id })
    return res.status(200).json(comments)
}

// Delete Temp Media
const deleteComment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such comment' })
    }

    const comment = await Comment.findOneAndDelete({ reviewId: id })

    if (!comment) {
        return res.status(404).json({ error: 'No such comment' })
    }

    res.status(200).json(comment)
}

module.exports = {
    createComment,
    countComments,
    getComments,
    deleteComment,
}