const User = require('../models/User.js')
const jwt = require('jsonwebtoken')


const handleErrors = (err) => {
    console.log(err.message, err.code)
    let errors = {email: '', password: ''}
        if (err.code === 11000) {
            errors.email = 'email already in use'
            return errors
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


    // Check if email already in use
    // const existingUser = await User.findOne({email: email}).exec()
    // if (existingUser) {
    //     return res.status(500).json({msg: `Email "${email}" is already in use`})
    // }

    if (password !== confirmPassword) {
        return res.status(400).json({msg: 'Passwords do not match'})
    }

    // Check password and confirm are similar
    if (password === confirmPassword) {
        // hash password

        // Create user
        try {
            const user = await User.create({email, password})
            const token = createToken(user._id)
            //maxAge in the options object of the cookie-parser library is in milliseconds
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
            res.status(201).json(user)
        } catch (error) {
           const errors = handleErrors(error)
            return res.status(400).json(errors)    
        }
    
    
    // Create User

    // redirect to login

}
}

module.exports.login = (req, res) => {
    res.json({msg: 'TODO: login implementation'})
}

module.exports.logout = (req, res) => {
    res.json({msg: 'TODO: logout implementation'})
}