/* @flow */
/* globals document, window */
import { isEmpty } from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './components/App';
import ColorProvider from './components/ColorProvider';

const user = window.___user; // eslint-disable-line no-underscore-dangle
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin',
  },
});
const client = new ApolloClient({ networkInterface });

render((
  <ColorProvider>
    <ApolloProvider client={client}>
      {!isEmpty(user) ?
        <App />
      :
        <div style={{ textAlign: 'center' }}>
          <a href="/auth/github">Login</a>
        </div>
      }
    </ApolloProvider>
  </ColorProvider>
), document.getElementById('root'));
