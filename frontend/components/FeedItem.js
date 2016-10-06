// @flow
import React from 'react';
import moment from 'moment';

type Props = {
  title: string,
  timestamp: string,
};

function FeedItem({ title, timestamp }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <em>{moment(new Date(timestamp)).format('DD.MM.YYYY')}</em>
    </div>
  );
}

export default FeedItem;
