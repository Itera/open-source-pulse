// @flow
import React from 'react';
import moment from 'moment';

type Props = {
  type: string,
  url: string,
  timestamp: string,
};

function FeedItem({ type, url, timestamp }: Props) {
  return (
    <div>
      <h2>{type}</h2>
      <p>{url}</p>
      <em>{moment(new Date(timestamp)).format('DD.MM.YYYY')}</em>
    </div>
  );
}

export default FeedItem;
