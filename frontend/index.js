/* @flow */
/* globals document, window */
import { isEmpty } from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';

const user = window.___user; // eslint-disable-line no-underscore-dangle
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});
const client = new ApolloClient({ networkInterface });

render((
  <ApolloProvider client={client}>
    <div style={{ textAlign: 'center' }}>
      {!isEmpty(user) ? <App /> : <a href="/auth/github">Login</a> }
    </div>
  </ApolloProvider>
), document.getElementById('root'));
