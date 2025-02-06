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
    coordinates: {
        type: {
          lat: { type: Number, required: true },
          lng: { type: Number, required: true }
        },
        required: true
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

const Location = model('Location', locationSchema);

module.exports = Location;
