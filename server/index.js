require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');

const express = require('express');
// const axios = require('axios');
const path = require('path');
require('./db/index.js');
const { user, pet, feed } = require('./routes');
const Post = require('./db/models/Post');

const app = express();
const PORT = 8080;
const url = 'localhost';

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'dist')));
app.use(express.json());
app.use('/feed', feed);
app.use('/user', user);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log('user profile is: ', profile);
    },
  ),
);

// const index = '../client/dist/index.html'
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '..', 'client', 'dist', 'index.html'),
    (data, err) => {
      if (err) {
        res.status(500).send(err);
      }
    },
  );
});

// Placeholder endpoint for adoption posts from the client
app.post('/AdoptionMessage', (req, res) => {
  console.log(req.body);
  Post.create(req.body.post)
    .then(() => console.log('success'))
    .catch((err) => console.error(err));
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`server totally listening @ http://${url}:${PORT}`);
});
