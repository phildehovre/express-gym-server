const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const membershipSchema = new Schema({
  type: {
    type: String,
    required: true, 
  },
  startDate: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  endDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }
});

const Membership = model('Membership', membershipSchema);

module.exports = Membership;