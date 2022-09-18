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
  pet.userId = 'none';

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

// update pet status to adopted
pet.put('/:petId', (req, res) => {
  // take in userId and petId
  const { pet } = req.body;
  let { petId } = req.params;
  petId = Number(petId);
  console.log('update data\n', pet, '\n\npet id\n', petId);

  // Pet model method to findOneandUpdate
  return Pet.findOneAndUpdate({ petId }, pet, {
    returnDocument: 'after',
  })
    .then((data) => {
      // if not found, send 404
      console.log('on successful update\n', data);
      // send data back to page
      res.status(201).send(data);
    })
    .catch((err) => {
      console.error('error updating pet\n\n', err);
      res.sendStatus(500);
    });
});

pet.get('/:petId', (req, res) => {
  // find One pet
  // return it's information
  const { petId } = req.params;
  Pet.findOne(petId)
    .then((data) => {
      if (data) {
        console.log('data from get/pet\n\n', data);
        res.status(201).send(data);
      }
      res.sendStatus(401);
    })
    .catch((err) => {
      console.error('error finding pet in get/pet\n\n'.err);
      res.sendStatus(500);
    });
});

pet.get('/api/:petId', (req, res) => {
  let { petId } = req.params;
  console.log('petId', petId);
  petId = Number(petId);
  console.log('petId as a number?', petId);

  return axios
    .get(`https://api.petfinder.com/v2/animals/${petId}`)
    .then((data) => {
      console.log('pet from api\n', data);
      if (data) {
        res.status(200).send(data);
      }
      res.sendStatus(401);
    })
    .catch((err) => {
      console.error('error getting pet from api... ofCourse\n', err);
      res.sendStatus(500);
    });
});

module.exports = pet;
