// require("./db/index");
const passport = require("passport");
const { create } = require("./database/schema/user");
const User = require("./database/schema/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const createUser = require("./database/user").createUser;
const createPortfolio = require("./database/portfolio").createPortfolio;
const createWallet = require("./database/wallet").createWallet;
const to = require("await-to-js").to;


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  async function(accessToken, refreshToken, profile, done) {
    let [uerr, user] = await to(
      createUser({
        email: profile._json.email,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        isVerified: profile._json.email_verified
      })
    );

    let [werr, wallet] = await to( createWallet({ user_id: user._id }) );

    let [perr, portfolio] = await to( createPortfolio({ user_id: user._id }) );

    user = await User.findOneAndUpdate(
      { email: profile._json.email },
      { wallet_id: wallet._id, portfolio_id: portfolio._id }
    );

    console.log(`User Created:\n`);
    console.log(user);

    done(uerr, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});