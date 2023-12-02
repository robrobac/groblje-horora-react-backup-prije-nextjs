const express = require('express');
const router = express.Router();
const {
    createNewUser,
    validateNewUser,
    getUser,
    deleteUser,
} = require('../controllers/authController');

// POST a new user
router.post('/users', createNewUser);

// GET a SINGLE User
router.get('/users/:email', getUser)

// Validate a new user
router.post('/validateNewUser', validateNewUser);

// DELETE a User
router.delete('/users/:email', deleteUser)

module.exports = router;