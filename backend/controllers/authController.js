const User = require('../models/userModel')
const mongoose = require('mongoose')


// Validate a new user
const validateNewUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let errorMessages = [];

        if (!username) {
            errorMessages.push('Invalid Username');
        } else {
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                errorMessages.push('Username already exists');
            }
        }

        if (!email) {
            errorMessages.push('Invalid Email');
        } else {
            const existingEmail = await User.findOne({ email });

            if (existingEmail) {
                errorMessages.push('Email already exists');
            }
        }

        if (!password) {
            errorMessages.push('Invalid Password');
        } else {

            if (password.length < 6) {
                errorMessages.push('Pasword must be 6 digits long');
            }
        }

        if (errorMessages.length > 0) {
            return res.status(400).json({ error: 'Registration Failed', errorMessages });
        }

        return res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error during user validation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new user
const createNewUser = async (req, res) => {
    const { username, email, role } = req.body

    try {
        const user = await User.create({ username, email, role })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    createNewUser,
    validateNewUser,
}