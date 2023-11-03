require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const reviewRoutes = require('./routes/reviews')
const tempMediaRoutes = require('./routes/tempMedia')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api', reviewRoutes)
// routes
app.use('/api', tempMediaRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and Listening to port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

