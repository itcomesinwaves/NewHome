const mongoose = require('mongoose');
const { savedPetSchema } = require('../mongoSchema.js');

const SavedPet = mongoose.model('SavedPet', savedPetSchema);

module.exports = SavedPet;
