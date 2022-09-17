const express = require('express');

const pet = express.Router();
const Pet = require('../db/models/Pet.js');
const SavedPet = require('../db/models/SavedPet.js');

pet.post('/savePet', (req, res) => {
  // log body provided by client
  const { pet } = req.body;
  const { userId } = pet;
  delete pet.userId;

  // check if pet is in database
  Pet.find({ petId: pet.petId })
    .then((data) => {
      console.log('length of data', data.length);
      // save pet to db Pet collection
      if (!data.length) {
        return Pet.create(pet);
      }
      // *if found move on without saving
    })
    .catch((err) => {
      console.error('error on Pet.find\n', err);
      res.sendStatus(500);
    })
    .then(() => SavedPet.find({
      userId,
      petId: pet.petId,
    }))
    .catch((err) => {
      console.error('error in pet.create\n', err);
      res.sendStatus(500);
    })
    .then((data) => {
      // then check saved pet documents for previous save
      console.log('data length from SavedPet.find\n', data.length);
      if (!data.length) {
        // create user/pet SavedPet
        return SavedPet.create({
          userId,
          petId: pet.petId,
        });
      }
      // if found move on/handle sending back error res
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('error on SavedPet.find\n', err);
      res.sendStatus(500);
    })
    .then(() => {
      // everybody rest
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error('error on create savedpet\n', err);
      res.sendStatus(500);
    });
});

module.exports = pet;
