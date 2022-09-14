require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const express = require('express');
// const axios = require('axios');
const path = require('path');
require('./db/index.js');
const { user, pet, feed } = require('./routes');
const Post = require('./db/models/Post');
const User = require('./db/models/User');

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
    ((accessToken, profile, cb) => {
      User.find({ googleId: profile.id })
        .then((user) => {
          if (user) {
            cb(null, user);
          } else {
            User.create({ googleId: profile.id })
              .then((user) => cb(null, user))
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }),
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

// Login start
app.get(
  '/user/auth/google',
  passport.authenticate('google', { scope: ['profile'] }),
);

// Login Success
app.get(
  '/user/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    const userID = req.user.id;
    res.redirect(`/id=${userID}`);
  },
);

app.listen(PORT, () => {
  console.log(`server totally listening @ http://${url}:${PORT}`);
});
