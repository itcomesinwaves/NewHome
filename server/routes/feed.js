const express = require('express');
const axios = require('axios');

const { API_AUTH, API_KEY, API_SECRET } = process.env;

/*
  handles api request and db request
*/

const feed = express.Router();
const Post = require('../db/models/Post.js');

feed.get('/api', (req, res) => {
  const config = {
    method: 'get',
    url: 'https://api.petfinder.com/v2/animals',
    headers: {
      Authorization: API_AUTH,
    },
  };

  axios(config)
    .then((response) => {
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
});

feed.get('/api/key', (req, res) => {
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
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
});

module.exports = feed;
