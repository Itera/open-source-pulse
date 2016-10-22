// @flow
import React from 'react';
import { find, flow, get, map } from 'lodash/fp';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';

import { Button, FormWrapper, Input, Radio } from './forms';
import Error from './Error';
import FeedEntryTypes from '../FeedEntryTypes';

class EntryForm extends React.Component {
  state = {
    type: '',
    url: '',
    invalid: false,
    submitted: false,
  };
  props: {
    onSubmit: Function,
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit = () => {
    const { submitted, ...state } = this.state; // eslint-disable-line no-unused-vars
    if (this.state.type && this.state.url) {
      this.props.onSubmit(state);
      this.setState({ submitted: true });
    } else {
      this.setState({ invalid: true });
    }
  }

  render() {
    if (this.state.submitted) {
      return <Redirect to="/feed" />;
    }

    return (
      <FormWrapper>
        <h2>Add an entry</h2>
        {this.state.invalid && <Error>Please fill out the every part of the form</Error>}
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
          value={this.state.url}
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
