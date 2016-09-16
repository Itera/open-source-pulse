/* @flow */
/* eslint-env jest */
import 'babel-core/register';
import Promise from 'bluebird';
import request from 'supertest';

import app from '../app';

Promise.promisifyAll(request);

it('GET / should return 200 with #app', t => {
  return request(app)
    .get('/')
    .expect(200)
    .endAsync()
    .then(response => t.ok(response.text.indexOf('id="app"')));
});
