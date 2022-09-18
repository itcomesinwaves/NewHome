const express = require('express');
const axios = require('axios');

const pet = express.Router();
const Pet = require('../db/models/Pet.js');
const SavedPet = require('../db/models/SavedPet.js');

const { API_KEY, API_SECRET } = process.env;

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

// get user savedPet list from database
pet.get('/savePet/:userId', (req, res) => {
  const { userId } = req.params;
  // get list by user id
  SavedPet.find({ userId })
    .then((savedList) => {
      if (!savedList.length) {
        res.sendStatus(404);
      }
      // if no list respond with 404
      return savedList;
    })
    .then((savedList) => {
      const pets = savedList.map(async ({ petId }) => {
        try {
          return await Pet.findOne({ petId });
        } catch (err) {
          console.error('error 1 here\n', err);
        }
      });

      return pets;
    })
    .then(async (pets) => {
      try {
        const results = await Promise.resolve(Promise.all(pets));

        res.status(200).send(results);
      } catch (err) {
        console.error('my dreams are now nightmares\n', err);
      }
    })
    .catch((err) => {
      console.error(' error on finding savedPets\n', err);
    });

  // query the database for each pet id, store in array
  // return array of animal objects back
});

module.exports = pet;
