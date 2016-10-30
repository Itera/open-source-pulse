// @flow
/* eslint-disable import/no-named-as-default */
import Feed from './components/Feed';
import EntryForm from './components/EntryForm';

export type Route = {
  pattern: string,
  exactly?: boolean,
  component: React$Component<> | () => React$Element<>,
  route?: Array<Route>,
}

const routes: Array<Route> = [
  { pattern: '/entry', component: EntryForm },
  { pattern: '/feed', component: Feed },
  { pattern: '/', exactly: true, component: Feed },
];

export default routes;
