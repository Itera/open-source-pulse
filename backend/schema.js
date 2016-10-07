/* @flow */
import { buildSchema } from 'graphql';

import { getUser, getUsers } from './db';

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
  feedItems: () => [
    { timestamp: new Date().toISOString(), title: 'Titles' },
  ],

  me: (obj: mixed, { user }: {user: string}) => user,
  user: ({ username }: { username: string}) => getUser(username),
  users: () => getUsers(),
};
