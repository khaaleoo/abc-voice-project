var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var userModel = require("../model/user.model");
var configAuth = require("../config/auth");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;

const createEntity = (profile, username) => {
  var entity = new Object();
  entity.email = username;
  entity.password = 0;
  entity.role = "user";
  entity.name= profile.displayName;
  return entity;
};
var localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  (username, password, done) => {
    userModel
      .findByEmail(username)
      .then(rows => {
        console.log(rows);
        if (rows.length === 0) {
          return done(null, false, { message: "Invalid username." });
        }

        var user = rows[0];
        var ret = bcrypt.compareSync(password, rows[0].password);
        if (ret) {
          return done(null, user);
        }

        return done(null, false, { message: "Invalid password." });
      })
      .catch(err => {
        return done(err, false);
      });
  }
);

const googleStrategy = new GoogleStrategy(
  {
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var username = "gg-" + profile.id;

    userModel
      .findByEmail(username)
      .then(rows => {
        if (rows.length == 0) {
          var entity = createEntity(profile, username);
          userModel
            .add(entity)
            .then(n => {
              userModel
                .findByEmail(username)
                .then(rows1 => {
                  var user = rows1[0];
                  return done(null, user);
                })
                .catch(err => {
                  next(err);
                });
            })
            .catch(err => {
              next(err);
            });
        } else {
          userModel
            .findByEmail(username)
            .then(rows1 => {
              var user = rows1[0];
              return done(null, user);
            })
            .catch(err => {
              next(err);
            });
        }
      })
      .catch(err => {
        next(err);
      });
  }
);
const facebookStrategy = new FacebookStrategy(
  {
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    var username = "fb-" + profile.id;
    userModel
      .findByEmail(username)
      .then(rows => {
        if (rows.length == 0) {
          var entity = createEntity(profile, username);
          userModel
            .add(entity)
            .then(n => {
              userModel
                .findByEmail(username)
                .then(rows1 => {
                  var user = rows1[0];
                  return done(null, user);
                })
                .catch(err => {
                  next(err);
                });
            })
            .catch(err => {
              next(err);
            });
        } else {
          userModel
            .findByEmail(username)
            .then(rows1 => {
              var user = rows1[0];
              return done(null, user);
            })
            .catch(err => {
              next(err);
            });
        }
      })
      .catch(err => {
        next(err);
      });
  }
);
module.exports = function(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(localStrategy);
  passport.use(googleStrategy);
  passport.use(facebookStrategy);

  passport.serializeUser((user, done) => {
    return done(null, user);
  });
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
};
