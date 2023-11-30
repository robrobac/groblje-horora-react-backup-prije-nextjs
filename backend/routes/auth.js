const express = require('express');
const router = express.Router();
const {
    createNewUser,
    validateNewUser
} = require('../controllers/authController');

// POST a new user
router.post('/users', createNewUser);

// Validate a new user
router.post('/validateNewUser', validateNewUser);

module.exports = router;