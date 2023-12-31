require('dotenv').config()

const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const reviewRoutes = require('./routes/reviews')
const tempMediaRoutes = require('./routes/tempMedia')
const authRoutes = require('./routes/auth')
const commentsRoutes = require('./routes/comments')
const cors = require('cors')
const Review = require('./models/reviewModel')

// express app
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
})

const corsOptions = {
    origin: "http://localhost:3000",
}

// middleware
app.use(express.json())
app.use(cors(corsOptions))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api', reviewRoutes)
app.use('/api', tempMediaRoutes)
app.use('/api', authRoutes)
app.use('/api', commentsRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const reviewChangeStream = Review.watch();

        reviewChangeStream.on('change', (change) => {
            console.log(change)
            io.emit('reviewChange', change)
        })

        // listen for requests
        server.listen(process.env.PORT, () => {
            console.log('Connected to DB and Listening to port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

