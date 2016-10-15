/* @flow */
/* eslint-disable react/prefer-stateless-function */
import { isFunction } from 'lodash/fp';
import React, { PropTypes } from 'react';

export function withContext<TKey: string>(contextKey: TKey, contextType: mixed = PropTypes.any) {
  return (Component: ReactClass<{[key: TKey]: mixed}>) => {
    const displayName = Component.displayName || Component.name;

    return class extends React.Component {
      subComponent: React$Component<>
      static displayName = `withContext(${displayName})`;
      static contextTypes = { [contextKey]: contextType };

      render() {
        const props = Object.assign(
          {},
          this.props,
          { [contextKey]: this.context[contextKey] }
        );

        if (!isFunction(Component.prototype.render)) {
          return <Component {...props} />;
        }
        return <Component ref={(c) => { this.subComponent = c; }} {...props} />;
      }
    };
  };
}

export const withTheme = withContext('theme', PropTypes.object);
