// @flow
/* eslint-disable import/no-named-as-default */
import Feed from './components/Feed';
import EntryForm from './components/EntryForm';
import Landing from './components/Landing';

export type Route = {
  pattern: string,
  exactly?: boolean,
  component: React$Component<> | () => React$Element<>,
  route?: Array<Route>,
}

const routes: Array<Route> = [
  { pattern: '/entry', component: EntryForm },
  { pattern: '/feed', component: Feed },
  { pattern: '/', exactly: true, component: Landing },
];

export default routes;
