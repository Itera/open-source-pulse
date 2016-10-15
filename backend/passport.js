/* @flow */
import passport from 'passport';
import GitHubStrategy from 'passport-github';

import * as config from './config';
import { getUser, saveUser } from './db';

export default passport;

passport.use(
  new GitHubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: `${config.PASSPORT_CALLBACK_DOMAIN}/auth/github/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    const transformedProfile = {
      ...profile,
      photos: profile.photos.map(({ value }) => value),
    };

    saveUser(transformedProfile)
      .then(() => done(null, profile))
      .catch((error) => done(error));
  })
);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  getUser(username)
    .then((user) => done(null, user))
    .catch((error) => done(error));
});
