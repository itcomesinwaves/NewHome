const mongoose = require('mongoose');
const { userSchema } = require('../mongoSchema.js');

const User = mongoose.model('User', userSchema);

module.exports = User;
