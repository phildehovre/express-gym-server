const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const extraSchema = new Schema({
    label: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    period: { type: String, enum: ['weekly', 'monthly', 'yearly'], required: true }  // 📆 Recurring price
});

const Extra = model('Extra', extraSchema)
module.exports = Extra;
