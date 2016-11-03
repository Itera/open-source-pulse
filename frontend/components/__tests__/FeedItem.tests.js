// @flow
/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import FeedItem from '../FeedItem';

describe('FeedItem', () => {
  const user = { username: 'albus', displayName: 'Albus Dumbledore', photos: ['albus.png'] };

  it('should render correctly for type CREATED_PR', () => {
    const wrapper = shallow(
      <FeedItem
        timestamp={new Date(2016, 4, 4, 10, 0).toISOString()}
        url="https://github.com/flowtype/flow-typed/pull/406"
        type="CREATED_PR"
        user={user}
      />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly for type WORKING_ON_ISSUE', () => {
    const wrapper = shallow(
      <FeedItem
        timestamp={new Date(2016, 4, 4, 10, 0).toISOString()}
        url="https://github.com/Itera/open-source-pulse/issues/16"
        type="WORKING_ON_ISSUE"
        user={user}
      />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly for type CODING_REPOSITORIY', () => {
    const wrapper = shallow(
      <FeedItem
        timestamp={new Date(2016, 4, 4, 10, 0).toISOString()}
        url="https://github.com/flowtype/flow-typed"
        type="CODING_REPOSITORY"
        user={user}
      />
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
