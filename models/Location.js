const mongoose = require('mongoose');
require('./Extra')

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
    geolocation: {
        type: {
            type: String,
            enum: ['Point'], // Ensures the type is always 'Point'
            required: true
        },
        coordinates: {
            type: [Number], // Array with [longitude, latitude]
            required: true,
            validate: {
                validator: function (arr) {
                    return arr.length === 2;
                },
                message: 'Coordinates must be an array of [longitude, latitude]'
            }
        }
    },
    extrasIds: [{ type: Schema.Types.ObjectId, ref: 'Extra' }],
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

locationSchema.index({geolocation: "2dsphere"})

const Location = model('Location', locationSchema);

module.exports = Location;
