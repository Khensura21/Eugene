const router = require("express").Router(),
      passport = require("passport");
const User = require("../models/schema/user");


function isAuthenticated(req,res,next) {
  console.log(req.logIn);
  if(req.user)
      return next();
  else
      return res.status(401).json({
        error: 'Login Nigga!'
      })
}

router.get('/google',
  passport.authenticate('google', { scope: ['profile', "email"] }));

router.get('/google/callback',
  // isAuthenticated,
  passport.authenticate('google', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    // console.log(`Request User:\n`);
    // console.log(req);
    console.log(req.user.email);
    res.send("Success...");
  });

router.get("/home", isAuthenticated, function(req, res) {
  res.send("Logged in!");
});

router.get("/login", function(req, res) {
  User.find({ email: "khensura.loveel@gmail.com" }, (err, user) => {
    req.logIn(user, err => {
      if (err) return next(err);
      return res.redirect("/");
    })
  })
})

module.exports = router;