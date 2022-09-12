const express = require('express');

const pet = express.Router();
const Pet = require('../db/models/Pet.js');

module.exports = pet;
