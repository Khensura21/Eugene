
require('dotenv').config(); //loads all of our env variables
const express = require('express'),
  app = express(),
  cors = require("cors"),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  errorHandler = require('./error'),
  authRoutes = require('./routes/auth'),
  PORT = 8080;

//require('./passportGoogleStrategy');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

// app.use(passport.initialize());
// app.use(passport.session());


// all routes ///
// app.get('/auth', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'] }));

// app.get('/auth/google/callback', (req, res) => {
//   // Successful authentication, redirect home.
//   res.send('Hi ra, it works!');
// });

app.get('/', (req, res) => {
  res.send('Welcome To Eugine App My friend!');
})

//custom err handling
app.use(function (req, res, next) {
  let err = new Error("Not found!");
  err.status = 404;
  next(err);
})

app.use(errorHandler);

app.listen(PORT, () => console.log("app is listening on PORT 8080"))
