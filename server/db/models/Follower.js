const mongoose = require('mongoose');
const { followersSchema } = require('../mongoSchema.js');

const Follower = mongoose.model('Follower', followersSchema);

module.exports = Follower;
