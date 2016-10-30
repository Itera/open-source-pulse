// @flow
import Redis from 'ioredis';
import { map } from 'lodash/fp';

import * as config from './config';
import type { User } from '../types/User';
import type { FeedItem } from '../types/FeedItem';

const redis = new Redis({
  port: config.DB_PORT,
  host: config.DB_HOST,
  password: config.DB_PASSWORD,
  db: config.DB_NAME,
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

export function addFeedItem(feeditem: FeedItem, user: User): Promise<> {
  if (!user || !user.username) {
    throw new Error('Not authorized');
  }
  return redis.lpush('feeditems', JSON.stringify({
    ...feeditem,
    username: user.username,
    timestamp: new Date().toISOString(),
  }));
}

async function assignUser(feedItem: FeedItem) {
  return { ...feedItem, user: await getUser(feedItem.username) };
}

export async function getFeedItems(): Promise<Array<FeedItem>> {
  const result = await redis.lrange('feeditems', 0, -1);

  return Promise.all(map((item) => assignUser(JSON.parse(item)))(result));
}
