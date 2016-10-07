// @flow
/* globals document */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { BrowserRouter, Miss } from 'react-router';

import MatchWithSubRoutes from './MatchWithSubRoutes';
import routes from '../routes';
import type { User } from '../../types/user';

function NotFound() {
  return (
    <h1>Could not find what you were looking for</h1>
  );
}

type Props = {
  data: {
    loading: boolean,
    me: User,
  }
};

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
    const { loading, me } = this.props.data;
    return (
      <BrowserRouter>
        <div>
          {(!loading && me) &&
            <div>
              {!this.state.zen && [
                <strong key={1}>👋 {me.displayName}</strong>,
                <a key={2} href="/auth/logout">Logout</a>,
              ]}
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

export default graphql(AppQuery)(App);
