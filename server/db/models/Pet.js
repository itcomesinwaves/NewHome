const mongoose = require('mongoose');
const { petSchema } = require('../mongoSchema.js');

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
