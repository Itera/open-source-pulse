import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const App = ({ data }: Object) => (
  <div>
    {(!data.loading && data.me) &&
      <div>
        <h1>👋 {data.me.displayName}</h1>
        <a href="/auth/logout">Logout</a>
      </div>
    }
  </div>
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
