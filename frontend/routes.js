// @flow
import Landing from './components/Landing';

export type Route = {
  pattern: string,
  exactly?: boolean,
  component: React$Component<> | () => React$Element<>,
  route?: Array<Route>,
}

const routes: Array<Route> = [
  { pattern: '/', exactly: true, component: Landing },
];

export default routes;
