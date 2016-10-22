// @flow
import React from 'react';
import moment from 'moment';
import { get, find } from 'lodash/fp';
import styled from 'styled-components';

import FeedEntryTypes from '../FeedEntryTypes';

type Props = {
  type: string,
  url: string,
  timestamp: string,
};

function titleFromUrl(url) {
  return (url.match(/com\/([^/]+)\/([^/]+)/) || []).slice(1).join(' / ');
}

const Date = styled.em`
  color: gray;
  font-size: 0.8em;
`;

const InfoContainer = styled.span`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 1rem;
`;

const RepoLink = styled.a`
  margin-top: 0.5rem;
  font-size: 1.5em;
  color: black;
`;

function FeedItem({ user, type, url, timestamp }: Props) {
  return (
    <div className="FeedItem">
      {user &&
        <div className="flex flex--center">
          <ProfilePicture src={user.photos[0]} alt={user.displayName} />
          <InfoContainer>
            <Date>{moment(new Date(timestamp)).format('DD.MM.YYYY')}</Date>
            <span>
              <strong>{user.displayName}</strong>
              &nbsp;
              {get('feedText')(find({ key: type })(FeedEntryTypes))}
            </span>
            <RepoLink href={url}>{titleFromUrl(url)}</RepoLink>
          </InfoContainer>
        </div>
      }
    </div>
  );
}

export default FeedItem;
