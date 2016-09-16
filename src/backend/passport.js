/* @flow */
import passport from 'passport';
import GitHubStrategy from 'passport-github';

import * as config from './config';

export default passport;

const users = {};

passport.use(
  new GitHubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: config.PASSPORT_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile, users.hasOwnProperty(profile.username))
    if (!users.hasOwnProperty(profile.username)) {
      users[profile.username] = profile;
      done(null, profile);
    } else {
      done(null, users[profile.username]);
    }
  }
));

passport.serializeUser((user, done) => {
  console.log("serializeUser", user)
  done(null, user.username)
});
passport.deserializeUser((username, done) => {
  console.log("deserializeUser", username)
  done(null, users[username])
});
