// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';

import { withTheme } from './withContext';
import type { Theme } from '../../types/theme';
import type { User } from '../../types/user';

type Props = {
  theme: Theme,
  zen: boolean,
  data: {
    loading: boolean,
    me: ?User,
  }
}

const style = (theme) => ({
  background: theme && theme.navbar.background,
  color: theme && theme.navbar.color,
  height: '4rem',
  textTransform: 'uppercase',
});

const linkStyle = (theme) => ({
  color: theme && theme.navbar.color,
  padding: '0 1rem',
  lineHeight: '4rem',
  display: 'inline-block',
  textDecoration: 'none',
  textTransform: 'uppercase',
});

const NavBar = ({ theme, zen, data }: Props) => {
  if (zen) {
    return <span />;
  }

  return (
    <div className="NavBar" style={style(theme)}>
      <div className="container flex">
        <div style={{ lineHeight: '4rem', width: '80%', textAlign: 'left' }}>
          <Link to="/" className="darken-hover" style={linkStyle(theme)}>Feed</Link>
          <Link to="/entry" className="darken-hover" style={linkStyle(theme)}>Post entry</Link>
        </div>
        <div style={{ lineHeight: '4rem', textAlign: 'right', width: '20%' }}>
          {data.me && data.me.displayName}
        </div>
      </div>
    </div>
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

export default withTheme(graphql(NavBarQuery)(NavBar));
