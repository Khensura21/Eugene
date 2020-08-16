
require('dotenv').config(); //loads all of our env variables
const bodyParser = require("body-parser"),
      CORS = require("cors"),
      express = require('express'),
      errorHandler = require('./utils/errorerror'),
      logger = require('morgan'),
      passport = require("passport"),
      path = require('path'),
      PORT = 8080,
      session = require("express-session");


const apiRouter = require("./routes/api/"),
      authRouter = require("./routes/auth"),
      indexRouter = require('./routes/index'),
      jwtAuthRouter = require('./routes/jwtAuth'),
      usersRouter = require('./routes/users');





require("./database/index");

const User = require("./database/schema/user");

const app = express();

// require("./passport-setup");
const { strategy } = require("./auth/strategies/google");
strategy(app);


app.use(logger('dev'));
app.use(CORS());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/auth", authRouter);
app.use('/auth/jwt', jwtAuthRouter);
app.use("/api", apiRouter);
process.on('warning', e => console.warn(e.stack));


//custom err handling
app.use(function (req, res, next) {
  let err = new Error("Not found!");
  err.status = 404;
  next(err);
})

app.use(errorHandler);

// module.exports = app;
app.listen(PORT, () => console.log("app is listening on PORT 8080"))