const express = require('express');
const router = express.Router();
const {
    createNewUser,
    validateNewUser,
    getUser
} = require('../controllers/authController');

// POST a new user
router.post('/users', createNewUser);

// GET a SINGLE User
router.get('/users/:email', getUser)

// Validate a new user
router.post('/validateNewUser', validateNewUser);

module.exports = router;