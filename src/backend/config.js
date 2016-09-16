/* @flow */
import fs from 'fs';
import path from 'path';

const secretsPath = process.env.SECRETS_PATH || path.resolve(__dirname, '../../secrets.json');
let secrets = {};
if (fs.existsSync(secretsPath)) {
  secrets = JSON.parse(fs.readFileSync(secretsPath).toString());
}

export const GITHUB_CLIENT_ID = secrets.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = secrets.GITHUB_CLIENT_SECRET;
export const PASSPORT_CALLBACK_DOMAIN = secrets.PASSPORT_CALLBACK_DOMAIN || 'http://127.0.0.1:3000';
export const PASSPORT_CALLBACK_PATH = secrets.PASSPORT_CALLBACK_PATH || '/auth/github/callback';
export const PASSPORT_CALLBACK_URL = PASSPORT_CALLBACK_DOMAIN + PASSPORT_CALLBACK_PATH;

export const DB_NAME = secrets.DB_NAME || 'open-source-pulse';
