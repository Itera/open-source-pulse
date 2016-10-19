/* @flow */
/* eslint-env jest */
import Promise from 'bluebird';
import request from 'supertest';

import app from '../app';

Promise.promisifyAll(request);

it.skip('GET / should return 200 with #app', () => {
  return request(app)
    .get('/')
    .expect(200)
    .endAsync()
    .then((response) => expect(response.text.indexOf('id="app"')).not.toEqual(-1));
});
