// @flow
/* globals document */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { BrowserRouter, Miss } from 'react-router';

import MatchWithSubRoutes from './MatchWithSubRoutes';
import { withTheme } from './withContext';
import NavBar from './NavBar';
import routes from '../routes';
import type { User } from '../../types/User';
import type { Theme } from '../../types/theme';

function NotFound() {
  return (
    <h2>Could not find what you were looking for</h2>
  );
}

type Props = {
  theme: Theme,
  data: {
    loading: boolean,
    me: User,
  }
};

const style = (theme) => ({
  background: theme.background,
  textAlign: 'center',
  height: '100%',
});

class App extends Component {
  props: Props;
  state: {zen: boolean};

  componentWillMount = () => {
    this.setState({ zen: false });
    document.addEventListener('keydown', this.onKeyDown, false);
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.onKeyDown, false);
  };

  onKeyDown = (event: {ctrlKey: boolean, keyCode: number}) => {
    if (event.ctrlKey && event.keyCode === 70) {
      this.setState((state) => {
        this.setState({ zen: !state.zen });
      });
    }
  }

  render() {
    const { theme } = this.props;
    const { loading, me } = this.props.data;
    return (
      <BrowserRouter>
        <div style={theme && style(theme)}>
          <NavBar zen={this.state.zen} />
          {(!loading && me) &&
            <div style={{ paddingTop: '1rem' }}>
              {routes.map((route, i) => (
                <MatchWithSubRoutes key={i} {...route} />
              ))}
              <Miss component={NotFound} />
            </div>
          }
        </div>
      </BrowserRouter>
    );
  }
}

const AppQuery = gql`
  query AppQuery {
    me {
      displayName,
      photos
    }
  }
`;

export default withTheme(graphql(AppQuery)(App));
