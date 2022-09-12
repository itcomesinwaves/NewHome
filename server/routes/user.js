const express = require('express');
const User = require('../db/models/User.js');
const passport = require('passport')

const user = express.Router();

user.use(passport.initialize());
user.use(passport.session());

user.get(
  "/signup/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

user.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/profile",
    failureFlash: true,
    successFlash: "Successfully logged in!",
  })
);

module.exports = user;
