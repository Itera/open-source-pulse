// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import styled from 'styled-components';

import type { Theme } from '../../types/theme';
import type { User } from '../../types/User';

type Props = {
  theme: Theme,
  zen: boolean,
  data: {
    loading: boolean,
    me: ?User,
  }
}

const NavBarWrapper = styled.div`
  background: ${(props) => props.theme.navbar.background};
  color: ${(props) => props.theme.navbar.color};
  height: 4rem;
  text-transform: uppercase;
`;

const NavBarLink = styled(Link)`
  color: ${(props) => props.theme.navbar.color};
  padding: 0 1rem;
  line-height: 4rem;
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
`;

const NavBar = ({ zen, data }: Props) => {
  if (zen) {
    return <span />;
  }

  return (
    <NavBarWrapper className="NavBar">
      <div className="container flex">
        <div style={{ lineHeight: '4rem', width: '80%', textAlign: 'left' }}>
          <NavBarLink to="/feed" className="darken-hover">Feed</NavBarLink>
          <NavBarLink to="/entry" className="darken-hover">Post entry</NavBarLink>
        </div>
        <div style={{ lineHeight: '4rem', textAlign: 'right', width: '20%' }}>
          {data.me && data.me.displayName}
        </div>
      </div>
    </NavBarWrapper>
  );
};

const NavBarQuery = gql`
  query NavBarQuery {
    me {
      displayName,
      photos
    }
  }
`;

export default graphql(NavBarQuery)(NavBar);
