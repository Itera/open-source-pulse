/* @flow */
/* eslint-env jest */
import 'babel-core/register';
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import request from 'supertest';

import app from '../app';

const readFileAsync = Promise.promisify(fs.readFile);
Promise.promisifyAll(request);

function loadFixture(name) {
  const filePath = path.resolve(__dirname, `fixtures/webhooks/github/${name}.json`);
  return readFileAsync(filePath)
    .then(content => JSON.parse(content));
}

it('POST /webhooks/github should return error for bad signature', t => {
  return request(app)
    .post('/webhooks/github')
    .set('x-hub-signature', 'wrong')
    .expect(403)
    .endAsync()
    .then(response => t.is(response.text, 'The signature is incorrect'));
});

it('POST /webhooks/github should return 202 for correct signature', t => {
  return loadFixture('ping')
    .then(fixture =>
      request(app)
        .post('/webhooks/github')
        .set('x-hub-signature', 'sha1=72645c0907f90e87a68344dc8b653df9cdbe43df')
        .send(fixture)
        .expect(202)
        .endAsync()
    )
    .then(response => t.is(response.text, 'Webhook received'));
});
