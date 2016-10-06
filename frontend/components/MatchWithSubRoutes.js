/* @flow */
import React from 'react';
import { Match } from 'react-router';

import type { Route } from '../routes';

const MatchWithSubRoutes = (route: Route) => (
  <Match
    {...route}
    render={(props: mixed) => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

export default MatchWithSubRoutes;
