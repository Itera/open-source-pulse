/* eslint-env jest */
import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

import { EntryForm } from '../EntryForm';

describe('EntryForm', () => {
  it('should render correctly', () => {
    const wrapper = mount(<EntryForm />);

    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('should call props.onSubmit when button is clicked', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<EntryForm onSubmit={onSubmit} />);

    wrapper.setState({ type: 'CREATED_ISSUE', url: 'http://example.com' });
    wrapper.find('button').simulate('click');

    expect(onSubmit).toBeCalledWith({ type: 'CREATED_ISSUE', url: 'http://example.com' });
  });

  it('should not call props.onSubmit when data is not filled', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<EntryForm onSubmit={onSubmit} />);

    wrapper.setState({ type: '', url: '' });
    wrapper.find('button').simulate('click');

    expect(onSubmit).not.toBeCalled();
  });
});
