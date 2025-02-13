const express = require('express');
const passport = require('passport');
const User = require('../db/models/User.js');

const user = express.Router();

user.post('/', (req, res) => {
  console.log('testing user server', req.body);
  const saveUser = async () => {
    try {
      // find the user in our database
      let user = await User.findOne({ googleId: req.body.googleId });

      if (user) {
        // If user present in our database.
        res.status(200).send(user);
      } else {
        // if user is not preset in our database save user data to database.
        user = await User.create(req.body);
        console.log('userCreate', user);
        res.sendStatus(201);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  };
  saveUser();
});
// user.use(passport.initialize());
// user.use(passport.session());

// user.get(
//   "/signup/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// user.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/",
//     successRedirect: "/profile",
//     failureFlash: true,
//     successFlash: "Successfully logged in!",
//   })
// );

module.exports = user;
