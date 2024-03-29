/* @flow */
/* eslint-disable no-console */
import 'babel-polyfill';
import Promise from 'bluebird';
import http from 'http';

import app from './backend/app';

global.Promise = Promise;
const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

function onListening() {
  console.log(
    '-----------------------------------------------\n',
    `Express app listening at http://localhost:${port}`
  );
}

server.listen(port);
server.on('listening', onListening);
