// @flow
import React from 'react';
import { map } from 'lodash/fp';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import FeedItem from './FeedItem';

function Feed({ data }: Object) {
  const renderFeedItems = map((feedItem) => <FeedItem key={feedItem.title} {...feedItem} />);
  return <div>{renderFeedItems(data.feedItems)}</div>;
}

const FeedQuery = gql`
  query FeedQuery {
    feedItems {
      title,
      timestamp
    }
  }
`;

export default graphql(FeedQuery)(Feed);
