const TempMedia = require('../models/tempMediaModel')
const mongoose = require('mongoose')


// Create a new Temp Media
const createTempMedia = async (req, res) => {
    const { url, path } = req.body

    // add doc to db
    try {
        const tempMedia = await TempMedia.create({ url, path })
        res.status(200).json(tempMedia)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete Temp Media
const deleteTempMedia = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such media' })
    }

    const tempMedia = await TempMedia.findOneAndDelete({ _id: id })

    if (!tempMedia) {
        return res.status(404).json({ error: 'No such media' })
    }

    res.status(200).json(tempMedia)
}


module.exports = {
    createTempMedia,
    deleteTempMedia,
}