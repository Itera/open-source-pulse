/* @flow */
import path from 'path';
import express from 'express';
import session from 'express-session';
import errorHandler from 'express-error-middleware';

import * as config from './config';
import passport from './passport';
import webhooks from './routes/webhooks';

const app = express();
export default app;

app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, './templates'));

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/webhooks', webhooks);

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email', 'public_repo'] }));
app.get('/auth/github/private', passport.authenticate('github', { scope: ['user:email', 'repo'] }));

app.get(config.PASSPORT_CALLBACK_PATH,
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
);

app.get('/', (req, res) => res.render('index', { user: req.user }));

app.use(errorHandler.NotFoundMiddleware);
app.use(errorHandler.ErrorsMiddleware);
