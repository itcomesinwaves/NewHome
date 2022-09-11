const mongoose = require('mongoose');
const { postSchema } = require('../mongoSchema.js');

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
