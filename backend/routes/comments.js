const express = require('express')

const {
    createComment,
    deleteComment,

} = require('../controllers/commentsController')

const router = express.Router()

// POST a NEW Comment
router.post('/comments/:id', createComment)

// DELETE a Comment
router.delete('/reviews/:reviewId/comments/:commentId', deleteComment)


module.exports = router