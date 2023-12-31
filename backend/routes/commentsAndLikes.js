const express = require('express')

const {
    createComment,
    deleteComment,
    createLike,
    removeLike

} = require('../controllers/commentsAndLikesController')

const router = express.Router()

// POST a NEW Comment
router.post('/comments/:id', createComment)
// DELETE a Comment
router.delete('/reviews/:reviewId/comments/:commentId', deleteComment)

// Create Like
router.post('/likes/:id', createLike)
// Create Like
router.delete('/reviews/:reviewId/likes/:likeEmail', removeLike)


module.exports = router