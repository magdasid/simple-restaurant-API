const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

let ObjectId = require('mongodb').ObjectID;
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })
    console.log(profile);
    if(existingUser) {
      return done(null, existingUser);
    }
    const user = await new User({ googleId: profile.id, email: profile.emails[0].value, name: profile.displayName, photo: profile._json.image.url }).save()
    done(null, user);
    }
  )
);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : '1234'
  },
  function (jwtPayload, cb) {
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findOne({ _id: ObjectId(jwtPayload._id) })
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
  }
));
