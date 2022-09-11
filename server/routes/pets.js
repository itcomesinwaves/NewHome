const express = require('express');

const pets = express.Router();
const Pets = require('../db/models/Pet.js');

module.exports = pets;
