/* @flow */
/* globals document */
import {isEmpty} from 'lodash';
import React from 'react';
import { render } from 'react-dom';

const user = window.user;

render((
  <div style={{textAlign: "center"}}>
    {!isEmpty(user) ?
      <div>
        <h1>👋 {user.displayName}</h1>
        <a href="/auth/logout">Logout</a>
      </div> : <a href="/auth/github">Login</a> }
  </div>
), document.getElementById('root'));
