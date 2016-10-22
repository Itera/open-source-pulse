/* @flow */
/* globals document, window */
import { isEmpty } from 'lodash';
import React from 'react';
import { render } from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import styled from 'styled-components';

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

const LoginButton = styled.a`
  font-size: 2rem;
  font-weight: 200;
  border: 0.2rem solid #d20a10;
  padding: 1rem;
  color: #d20a10;
  text-transform: uppercase;
  text-decoration: none;
`;

render((
  <ColorProvider>
    <ApolloProvider client={client}>
      {!isEmpty(user) ?
        <App />
      :
        <div style={{ textAlign: 'center', paddingTop: '10rem' }}>
          <LoginButton href="/auth/github">Login to make a difference</LoginButton>
        </div>
      }
    </ApolloProvider>
  </ColorProvider>
), document.getElementById('root'));
