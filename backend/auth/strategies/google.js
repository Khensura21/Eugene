const passport = require("passport"),
      passportGoogle = require("passport-google-oauth20");

const { getUserByProviderId, createUser } = '../../models/user'
//const { signToken } = '../utils'

const GoogleStrategy = passportGoogle.Strategy;

const strategy = app => {
  const strategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_API_URL}/auth/google/callback`
  }

  const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    let [euerr, existingUser] = await to( getUserByEmail(profile._json.email) );
    if (existingUser) { return done(euerr, existingUser); }

    let [uerr, user] = await to(
      createUser({
        email: profile._json.email,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        isVerified: profile._json.email_verified
      })
    );

    let [werr, wallet] = await to( createWallet({ user_id: user._id }) );
    if (werr) return done(werr, null);

    let [perr, portfolio] = await to( createPortfolio({ user_id: user._id }) );
    if (perr) return done(perr, null);

    user = await User.findOneAndUpdate(
      { email: profile._json.email },
      { wallet_id: wallet._id, portfolio_id: portfolio._id }
    );

    return done(uerr, user);
  }

  passport.use(new GoogleStrategy(strategyOptions, verifyCallback));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.get(
    `/auth/google`,
    passport.authenticate("google", {
      scope: [
        "profile",
        "email"
      ]
    })
  );

  app.get(
    `/auth/google/callback`,
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      return res
        .status(200)
        .cookie("jwt", signToken(req.user), {
          httpOnly: true
        })
        .redirect("/")
    }
  );

  return app;
}


module.exports = {
  strategy
};