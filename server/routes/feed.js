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
  const queryStrArr = [
    species.length ? `type=${species}` : species,
    breed.length ? `breed=${breed}` : breed,
    gender.length ? `gender=${gender}` : gender,
    age.length ? `age=${age}` : age,
    hairLength.length ? `coat=${hairLength}` : hairLength,
  ];
  search(
    searchString.concat(
      '',
      queryStrArr.filter((str) => str.length !== 0).join('&'),
    ),
  )
    .then((animals) => {
      res.status(201).send(JSON.stringify(animals));
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(err.response.status);
    });
});

// Helper Functions

// Gets basic pet page (no search params)
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

// Gets auth token
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

const search = (searchString) => new Promise((res, rej) => {
  const config = {
    method: 'get',
    url: searchString,
    headers: {
      Authorization: process.env.API_AUTH,
    },
  };

  axios(config)
    .then((response) => res(response.data))
    .catch((err) => rej(err));
});

module.exports = feed;
