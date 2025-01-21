const User = require('../models/User.js')
const jwt = require('jsonwebtoken')


const handleErrors = (err) => {
    let errors = {email: '', password: ''}
        if (err.code === 11000) {
            errors.email = 'email already in use'
            return errors
        }

    if (err.message === 'incorrect email') {
        errors.email = 'This email does not exist'; 
    }

    if (err.message === 'incorrect password') {
        errors.password = 'The password is incorrect' 
    }
    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message 
        });
    }
    return errors
}

//3days expiration time in seconds
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: maxAge}) 
}

module.exports.register = async (req, res) => {
    const {email, password, confirmPassword} = req.body

    if (password !== confirmPassword) {
        return res.status(400).json({errors: {password: 'passwords do not match'}})
    }

        // Create user
        try {
            const user = await User.create({email, password})
            const token = createToken(user._id)
            //maxAge in the options object of the cookie-parser library is in milliseconds
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
            res.status(201).json(user)
        } catch (error) {
           const errors = handleErrors(error)
           res.status(400).json({errors})    
        }
}

module.exports.login = async (req, res) => {
    const {password, email} = req.body
    try {
       const user = await User.login(email, password) 
       const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user._id})
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json({errors}) 
    }
}

module.exports.logout = (req, res) => {
    res.json({msg: 'TODO: logout implementation'})
}