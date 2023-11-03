const express = require('express')
const router = express.Router()
const {
    createTempMedia,
    deleteTempMedia,
} = require('../controllers/tempMediaController')

// POST a NEW tempMedia
router.post('/tempMedia', createTempMedia)

// POST a NEW tempMedia
router.delete('/tempMedia/:id', deleteTempMedia)


module.exports = router