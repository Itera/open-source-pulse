// @flow
/* globals document */
import React, { Component } from 'react';
import type { Theme } from '../../types/theme';

const LIGHT_THEME: Theme = {
  background: '#fafafa',
  color: '#000000',
  navbar: {
    background: '#d20a10',
    color: 'white',
  },
};

const DARK_THEME: Theme = {
  background: '#333333',
  color: '#fafafa',
  navbar: {
    background: '#d20a10',
    color: 'white',
  },
};

export default class ColorProvider extends Component {
  // $FlowTodo
  props: {children: React$Element<>};
  state: {theme: Theme} = { theme: LIGHT_THEME };

  getChildContext() {
    return { theme: this.state.theme };
  }

  componentWillMount = () => {
    document.addEventListener('keydown', this.onKeyDown, false);
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.onKeyDown, false);
  };

  onKeyDown = (event: {ctrlKey: boolean, key: string}) => {
    if (event.ctrlKey && event.key === 'd') {
      this.setState((state) => {
        this.setState({ theme: state.theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME });
      });
    }
  }

  render() {
    return this.props.children;
  }
}

ColorProvider.childContextTypes = {
  theme: React.PropTypes.object,
};
