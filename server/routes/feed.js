const express = require('express');

const feed = express.Router();
const Post = require('../db/models/Post.js');

module.exports = feed;
