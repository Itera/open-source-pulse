/* @flow */
import _ from 'lodash';
import path from 'path';
import express from 'express';
import session from 'express-session';
import errorHandler from 'express-error-middleware';
import redisStoreCreator from 'connect-redis';
import graphqlHTTP from 'express-graphql';

import * as config from './config';
import passport from './passport';
import webhooks from './routes/webhooks';
import { rootValue, schema } from './schema';

const app = express();
export default app;

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, './templates'));

app.use(express.static('./dist'));

const RedisStore = redisStoreCreator(session);
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
  store: new RedisStore({
    host: config.DB_HOST,
    port: config.DB_PORT,
    pass: config.DB_PASSWORD,
  }),
  cookie: { secure: false },
}));

app.use(passport.initialize());
app.use(passport.session());

if (config.DEV) {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  console.log('Loading webpack'); // eslint-disable-line no-console
  const webpack = require('webpack');
  const webpackConfig = require('./webpack')(config.WEBPACK_OPTIONS);

  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));

  if (config.HOT_RELOADING) {
    app.use(require('webpack-hot-middleware')(compiler));
  }
  /* eslint-enable global-require, import/no-extraneous-dependencies */
}

app.use('/webhooks', webhooks);

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email', 'public_repo'] }));
app.get('/auth/github/private', passport.authenticate('github', { scope: ['user:email', 'repo'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
);

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.get('/*', (req, res) => {
  const userInfo = _.omit(req.user, ['_raw', '_json', '_accessLevel', 'provider']);
  res.render('index', {
    user: req.user,
    userInfo: `window.___user = ${JSON.stringify(userInfo)}`,
  });
});

app.use(errorHandler.NotFoundMiddleware);
app.use(errorHandler.ErrorsMiddleware);
