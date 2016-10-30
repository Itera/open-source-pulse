/* @flow */
import fs from 'fs';
import path from 'path';

const secretsPath = process.env.SECRETS_PATH || path.resolve(__dirname, '../secrets.json');
let secrets = {};
if (fs.existsSync(secretsPath)) {
  secrets = JSON.parse(fs.readFileSync(secretsPath).toString());
}

const defaults = {
  DB_HOST: 'localhost',
  DB_PORT: '6379',
  DB_PASSWORD: '',
  DB_NAME: 4,
  NODE_ENV: 'development',
  PASSPORT_CALLBACK_DOMAIN: 'http://127.0.0.1:3000',
  GITHUB_CLIENT_ID: '',
  GITHUB_CLIENT_SECRET: '',
};

function secret(key): string {
  return process.env[key] || secrets[key] || defaults[key];
}

export const ENV = secret('NODE_ENV') || 'development';
export const DEV = ENV === 'development';
export const GITHUB_CLIENT_ID = secret('GITHUB_CLIENT_ID');
export const GITHUB_CLIENT_SECRET = secret('GITHUB_CLIENT_SECRET');

export const PASSPORT_CALLBACK_DOMAIN = secret('PASSPORT_CALLBACK_DOMAIN');

export const DB_HOST = secret('DB_HOST');
export const DB_PORT = secret('DB_PORT');
export const DB_PASSWORD = secret('DB_PASSWORD');
export const DB_NAME = parseInt(secret('DB_NAME'), 10);

export const WEBPACK_OPTIONS = {
  dev: DEV,
};
