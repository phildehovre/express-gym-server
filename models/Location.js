const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postcode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    }
})

const Location = model('Location', locationSchema);

module.exports = Location;