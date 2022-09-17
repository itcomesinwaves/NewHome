const express = require('express');

const pet = express.Router();
const Pet = require('../db/models/Pet.js');
const SavedPet = require('../db/models/SavedPet.js');

pet.post('/savePet', (req, res) => {
  // log body provided by client
  console.log(req.body);

  // check if pet is in database
  // save pet to db Pet collection
  // *if found move on without saving
  // then check saved pet documents for previous save
  // create user/pet SavedPet
  // if found move on/handle sending back error res
});

module.exports = pet;
