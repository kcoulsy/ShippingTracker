const mongoose = require('mongoose');

const Shipment = mongoose.model('Shipment', {
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String
  },
  contents: {
    type: Array
  },
  shippingCost: {
    type: Number
  },
  tracking: {
    type: String
  },
  status: {
    type: String
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    require: true

  }
});

module.exports = {Shipment};
