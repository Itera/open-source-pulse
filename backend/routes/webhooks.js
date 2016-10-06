/* @flow */
import { Router } from 'express';
import crypto from 'crypto';

import { BadSignatureError } from '../errors';

const router = Router(); // eslint-disable-line new-cap
export default router;

function calculateSignature(payload = {}) {
  const hmac = crypto.createHmac('sha1', 'fix');
  hmac.setEncoding('hex');
  hmac.write(JSON.stringify(payload));
  hmac.end();

  return `sha1=${(hmac.read() || '').toString()}`;
}

router.post('/github', (req, res, next) => {
  if (req.headers['x-hub-signature'] !== calculateSignature(req.body)) {
    return next(new BadSignatureError());
  }

  return res
    .status(202)
    .send('Webhook received');
});
