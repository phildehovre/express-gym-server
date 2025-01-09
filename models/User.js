const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        // validate takes in as a first array item a function
        // to which the submitted value is automatically passed
        validate: [isEmail, 'please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [6, 'minimum password length is 6 characters'] 
    }
})

// userSchema.post('save', function(doc, next) {
    // console.log('User instance after being saved to DB: ', doc)
// })

userSchema.pre('save', async function(next) {
    // console.log('User instance before being saved to DB', this)
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Whatever we call this model, it needs to be the singular
// of whatever DB collection it will be written to
// Mongoose will pluralise it and look for users!
const User = mongoose.model('user', userSchema)

module.exports = User;