// @flow
import React from 'react';
import moment from 'moment';
import { get, find } from 'lodash/fp';
import styled from 'styled-components';

import FeedEntryTypes from '../FeedEntryTypes';
import type { User } from '../../types/User';

type Props = {
  type: string,
  url: string,
  user: User,
  timestamp: string,
};

function titleFromUrl(url) {
  const parts = url.match(/com\/([^/]+)\/([^/]+)(?:\/(?:pull|issues)\/(\d+))?/) || [];
  return parts.slice(1, 3).join(' / ') + (parts[3] ? ` #${parts[3]}` : '');
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

const ProfileLink = styled.a`
  color: black;
  text-decoration: none;
`;

function FeedItem({ user, type, url, timestamp }: Props) {
  const profileUrl = `https://github.com/${user.username}`;
  return (
    <div className="FeedItem">
      {user &&
        <div className="flex flex--center">
          <ProfileLink href={profileUrl}>
            <ProfilePicture src={user.photos[0]} alt={user.displayName} />
          </ProfileLink>
          <InfoContainer>
            <Date>{moment(new Date(timestamp)).format('DD.MM.YYYY')}</Date>
            <span>
              <ProfileLink href={profileUrl}><strong>{user.displayName}</strong></ProfileLink>
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
