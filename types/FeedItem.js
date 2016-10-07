export type FeedItem = {|
  timestamp: string,
  type: string,
  user: User,
  url: string
|};

export type FeedItemInput = {|
  type: string,
  username: string,
  url: string
|};
