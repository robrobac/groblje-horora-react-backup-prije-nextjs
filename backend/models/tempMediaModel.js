const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TempMediaSchema = new Schema({
    url: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: false
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('TempMedia', TempMediaSchema)