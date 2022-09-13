const express = require('express');
const axios = require('axios');

const { API_KEY, API_SECRET } = process.env;

/*
  handles api request and db request

  helper function to get api page, if fail then helper to get api auth
  then run helper function to get api page.
*/

const feed = express.Router();
const Post = require('../db/models/Post.js');

// GET API page
feed.get('/api', (req, res) => {
  getPage()
    .then((page) => res.send(page))
    .catch((err) => {
      if (err.response.status === 401) {
        getApiAuth()
          .then(() => getPage())
          .then((page) => {
            res.send(page);
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(404);
          });
      } else {
        res.sendStatus(err.status);
      }
    });
});

// Handle Search
feed.post('/api/search', (req, res) => {
  const {
    species, breed, gender, age, hairLength,
  } = req.body;

  // getting all options for search
  const searchString = 'https://api.petfinder.com/v2/animals?';
  const speciesStr = species.length ? `type=${species}` : species;
  const breedStr = breed.length ? `breed=${breed}` : breed;
  const genderStr = gender.length ? `gender=${gender}` : gender;
  const ageStr = age.length ? `age=${age}` : age;
  const hairLengthStr = hairLength.length ? `coat=${hairLength}` : hairLength;
  console.log(speciesStr, breedStr, genderStr, ageStr, hairLengthStr);

  res.sendStatus(201);
});

// Helper Functions

const getPage = () => new Promise((res, rej) => {
  const config = {
    method: 'get',
    url: 'https://api.petfinder.com/v2/animals',
    headers: {
      Authorization: process.env.API_AUTH,
    },
  };

  axios(config)
    .then((response) => {
      res(JSON.stringify(response.data));
    })
    .catch((err) => rej(err));
});

const getApiAuth = () => new Promise((res, rej) => {
  const data = JSON.stringify({
    grant_type: 'client_credentials',
    client_id: API_KEY,
    client_secret: API_SECRET,
  });

  const config = {
    method: 'post',
    url: 'https://api.petfinder.com/v2/oauth2/token',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  axios(config)
    .then((response) => {
      process.env.API_AUTH = `Bearer ${response.data.access_token}`;
      return res();
    })
    .catch((err) => rej(err));
});

module.exports = feed;
