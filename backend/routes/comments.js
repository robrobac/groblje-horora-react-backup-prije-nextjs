const express = require('express')
const Comment = require('../models/commentModel')

const {
    createComment,
    countComments,
    getComments,
    deleteComment

} = require('../controllers/commentsController')

const router = express.Router()

// GET Comments
router.get('/getComments/:id', getComments)

// POST a NEW Comment
router.post('/comments', createComment)

// DELETE a Comment
router.delete('/deleteComment/:id', deleteComment)

// Count Comments per post
router.get('/countComments/:id', countComments)


module.exports = router