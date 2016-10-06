/* @flow */
import passport from 'passport';
import GitHubStrategy from 'passport-github';
import Redis from 'ioredis';

import * as config from './config';

export default passport;

const redis = new Redis({
  port: config.DB_PORT,
  host: config.DB_HOST,
  password: config.DB_PASSWORD,
});

passport.use(
  new GitHubStrategy({
    clientID: config.GITHUB_CLIENT_ID,
    clientSecret: config.GITHUB_CLIENT_SECRET,
    callbackURL: `${config.PASSPORT_CALLBACK_DOMAIN}/auth/github/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    const transformedProfile = Object.assign(profile, {
      photos: profile.photos.map(({ value }) => value),
    });

    redis.hset('users', profile.username, JSON.stringify(transformedProfile))
      .then(() => {
        done(null, profile);
      })
      .catch((error) => {
        done(error);
      });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  redis.hget('users', username)
    .then((user) => done(null, JSON.parse(user)))
    .catch((error) => done(error));
});
