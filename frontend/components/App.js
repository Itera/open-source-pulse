// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { BrowserRouter, Miss } from 'react-router';

import MatchWithSubRoutes from './MatchWithSubRoutes';
import routes from '../routes';

function NotFound() {
  return (
    <h1>Could not find what you were looking for</h1>
  );
}

const App = ({ data }: Object) => (
  <BrowserRouter>
    <div>
    {(!data.loading && data.me) &&
      <div>
        <h1>👋 {data.me.displayName}</h1>
        <a href="/auth/logout">Logout</a>
        {routes.map((route, i) => (
          <MatchWithSubRoutes key={i} {...route} />
        ))}

        <Miss component={NotFound} />
      </div>
    }
    </div>
  </BrowserRouter>
);

const AppQuery = gql`
  query AppQuery {
    me {
      displayName,
      photos
    }
  }
`;

export default graphql(AppQuery)(App);
