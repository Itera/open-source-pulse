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
    if (!{}.hasOwnProperty.call({}, profile.username)) {
      users[profile.username] = profile;
      done(null, profile);
    } else {
      done(null, users[profile.username]);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.username)
});

passport.deserializeUser((username, done) => {
  done(null, users[username])
});
