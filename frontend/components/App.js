// @flow
/* globals document */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { BrowserRouter, Miss } from 'react-router';

import MatchWithSubRoutes from './MatchWithSubRoutes';
import NavBar from './NavBar';
import routes from '../routes';
import type { User } from '../../types/User';

function NotFound() {
  return (
    <h2>Could not find what you were looking for</h2>
  );
}

type Props = {
  data: {
    loading: boolean,
    me: User,
  }
};

const AppWrapper = styled.div`
  background: ${(props) => props.theme.background};
  text-align: center;
  height: 100%;
`;

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
        <AppWrapper>
          <NavBar zen={this.state.zen} />
          {(!loading && me) &&
            <div style={{ paddingTop: '1rem' }}>
              {routes.map((route, i) => (
                <MatchWithSubRoutes key={i} {...route} />
              ))}
              <Miss component={NotFound} />
            </div>
          }
        </AppWrapper>
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
