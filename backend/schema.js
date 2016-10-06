/* @flow */
import _ from 'lodash';
import { buildSchema } from 'graphql';

import Redis from 'ioredis';

import * as config from './config';

const redis = new Redis({
  port: config.DB_PORT,
  host: config.DB_HOST,
  password: config.DB_PASSWORD,
});

export const schema = buildSchema(`
  type User {
    username: String,
    displayName: String,
    profileUrl: String,
    photos: [String]
  }

  type FeedItem {
    timestamp: String,
    title: String,
    user: User,
  }

  type Query {
    feedItems: [FeedItem],
    me: User,
    user(username: String): User,
    users: [User],
  }
`);

export const rootValue = {
  feedItems: () => [ ],

  me: (obj: mixed, { user }: {user: string}) => _.omit(user, ['_raw', '_json']),

  user: ({ username }: { username: string}) =>
    redis.hget('users', username)
      .then(result => Object.assign({}, result, { username })),

  users: () =>
    redis.hgetall('users')
      .then(result =>
        console.log(result) ||
        Object.keys(result)
          .map(username => Object.assign({}, JSON.parse(result[username]), { username }))
      ),
};
