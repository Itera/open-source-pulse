// @flow
import React from 'react';
import { find, flow, get, map } from 'lodash/fp';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';

import { Button, FormWrapper, Input, Radio } from './forms';
import FeedEntryTypes from '../FeedEntryTypes';

class EntryForm extends React.Component {
  state = {};
  props: {
    onSubmit: Function,
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = () => {
    const { submitted, ...state } = this.state; // eslint-disable-line no-unused-vars
    this.props.onSubmit(state);
    this.setState({ submitted: true });
  }

  render() {
    if (this.state.submitted) {
      return <Redirect to="/feed" />;
    }

    return (
      <FormWrapper>
        <h2>Add an entry</h2>
        {map(({ key, description }) =>
          <Radio
            key={key}
            id={`radio-${key}`}
            name="type"
            value={key}
            checked={this.state.type === key}
            label={description}
            onChange={this.onChange}
          />
        )(FeedEntryTypes)}

        <Input
          type="text"
          name="url"
          label="URL"
          placeholder={
            flow(
              find({ key: this.state.type }),
              get('urlPlaceholder'),
            )(FeedEntryTypes) || 'Github url'
          }
          value={this.state.value}
          onChange={this.onChange}
        />
        <Button onClick={() => this.onSubmit(this.state)}>Update</Button>
      </FormWrapper>
    );
  }
}

const feedItemMutation = gql`
  mutation createFeedItem($feedItem: FeedItemInput!) {
    createFeedItem(feedItem: $feedItem) {
      type,
      url
    }
  }
`;

export default graphql(feedItemMutation, {
  props: ({ mutate }) => ({
    onSubmit: (feedItem) => mutate({ variables: { feedItem } }),
  }),
})(EntryForm);
