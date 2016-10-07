// @flow
import Redis from 'ioredis';

import * as config from './config';
import type { User } from '../types/user';

const redis = new Redis({
  port: config.DB_PORT,
  host: config.DB_HOST,
  password: config.DB_PASSWORD,
});

export function getUser(username: string): Promise<User> {
  return redis.hget('users', username)
    .then((result: string) => JSON.parse(result));
}

export function getUsers(): Promise<Array<User>> {
  return redis.hgetall('users')
    .then((result: {[key: string]: string}) =>
      Object.keys(result)
        .map((username) => JSON.parse(result[username]))
    );
}

export function saveUser(user: User): Promise<> {
  return redis.hset('users', user.username, JSON.stringify(user));
}
