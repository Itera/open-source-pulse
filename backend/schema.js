/* @flow */
import { buildSchema } from 'graphql';

import { getFeedItems, getUser, getUsers, addFeedItem } from './db';
import { FeedItemInput } from '../types/FeedItem';
import type { User } from '../types/User';

export const schema = buildSchema(`
  type User {
    username: String,
    displayName: String,
    profileUrl: String,
    photos: [String]
  }

  type FeedItem {
    timestamp: String,
    type: String,
    user: User,
    url: String
  }

  input FeedItemInput {
    type: String,
    username: String,
    url: String
  }

  type Query {
    feedItems: [FeedItem],
    me: User,
    user(username: String): User,
    users: [User],
  }

  type Mutation {
    createFeedItem(feedItem: FeedItemInput): FeedItem
  }
`);

type Options = {
  user: User,
}

export const rootValue = {
  feedItems: () => getFeedItems(),

  me: (obj: mixed, { user }: Options) => user,

  user: ({ username }: { username: string}) => getUser(username),

  users: () => getUsers(),

  createFeedItem: (input: { feedItem: FeedItemInput}, { user }: Options) =>
    addFeedItem(input.feedItem, user),
};
