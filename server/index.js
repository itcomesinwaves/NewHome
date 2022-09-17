// Imports/Dependencies
require('dotenv').config();
require('./db/index.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const express = require('express');
const session = require('express-session');
const aws = require('aws-sdk');
const path = require('path');
const { user, pet, feed } = require('./routes');
const Post = require('./db/models/Post');
const User = require('./db/models/User');

// Generating application and setting url
const app = express();
const PORT = 8080;
const url = 'localhost';

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'dist')));
app.use(express.json());
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/feed', feed);
app.use('/user', user);
app.use('/pet', pet);

aws.config.update({
  accessKeyId: process.env.STORJ_API_KEY,
  secretAccessKey: process.env.STORJ_API_SECRET,
});

const authUser = (request, accessToken, refreshToken, profile, done) => done(null, profile);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    authUser,
  ),
);

passport.serializeUser((user, done) => {
  console.log('\n--------> Serialize User:');
  // console.log(user);
  // The USER object is the "authenticated user" from the done() in authUser function.
  // serializeUser() will attach this user to "req.session.passport.user.{user}", so that
  // it is tied to the session object for each session.

  done(null, user);
});
// deserialize user keeps running, in the console, should probably do something about it
passport.deserializeUser((user, done) => {
  console.log('\n--------- Deserialized User:');
  // console.log(user);
  // This is the {user} that was saved in req.session.passport.user.{user} in the
  // serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it
  // can be used anywhere in the App.

  done(null, user);
});

// const index = '../client/dist/index.html'
app.get('/', (req, res) => {
  res.render('index');
});

// Placeholder endpoint for adoption posts from the client
app.post('/AdoptionMessage', (req, res) => {
  // console.log(req.body);
  Post.create(req.body.post)
    .then(() => console.log('success'))
    .catch((err) => console.error(err));

  res.sendStatus(200);
});

app.post('/image', (req, res) => {
  const endpoint = new aws.Endpoint(process.env.STORJ_API_URL);
  const s3 = new aws.S3({ endpoint });
  s3.getObject(
    { Bucket: 'new-home-bucket', Key: req.body.post.image },
    (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(data);
      }
    },
  );
});

/*
let count = 1;
const showlogs = (req, res, next) => {
	console.log('\n==============================');
	console.log(`------------>  ${count++}`);

	console.log(`\n req.session.passport -------> `);
	console.log(req.session.passport);

	console.log(`\n req.user -------> `);
	console.log(req.user);

	console.log('\n Session and Cookie');
	console.log(`req.session.id -------> ${req.session.id}`);
	console.log(`req.session.cookie -------> `);
	console.log(req.session.cookie);

	console.log('===========================================\n');

	next();
};

app.use(showlogs);
*/
// Login start
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);
// on success redirects to '/' which is our login page in react
// Login Success
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  }),
);
// this is the page that gets called up on browser refresh with the google button for auth
app.get('/login', (req, res) => {
  console.log(req.user);
  res.sendFile(
    path.resolve(__dirname, '..', 'client', 'dist', 'index.html'),
    (data, err) => {
      if (err) {
        res.status(500).send(err);
      }
    },
  );
});
// can use this to check status on every page request as needed
// Use the req.isAuthenticated() function to check if user is Authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
  return null;
};

// this also keeps running/getting called in the console. check on it
app.get('/proAuth', checkAuthenticated, (req, res) => {
  console.log('hi profile');
  return res.json(req.user);
});

app.post('/imageUrl', (req, res) => {
  const { filename, filetype } = req.body;
  const endpoint = new aws.Endpoint(process.env.STORJ_API_URL);
  const s3 = new aws.S3({ endpoint });
  const params = {
    Bucket: 'new-home-bucket',
    Expires: 60,
    Key: filename,
    ContentType: filetype,
  };

  s3.getSignedUrl('putObject', params, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } else {
      console.log(data);
      res.status(200).send(data);
    }
  });
});
// create /isAuthenticated path for logged in status and data to pass to react side
app.get('/isAuthenticated', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('testing hereeeeeeeee', req.isAuthenticated());
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});
// create a route in react for button to connect/call this /logout endpoint
// Define the Logout
// app.post('/logout', (req, res) => {
// 	req.logOut();
// 	res.redirect('/login');
// 	console.log('-------> User Logged out');
// });
app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        console.log('am i logged out here????');
        res.status(200).send('logged out worked');
      }
    });
  } else {
    console.log('whats going on here???');
    res.end();
  }
});
// wildcard-catch-all
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

app.listen(PORT, () => {
  console.log(`server totally listening @ http://${url}:${PORT}/home`);
});
