// @flow
import React from 'react';
import { map } from 'lodash/fp';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Redirect } from 'react-router';

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

  renderOptions = map((option) =>
    <option key={option.key} value={option.key}>{option.description}</option>
  );

  render() {
    if (this.state.submitted) {
      return <Redirect to="/feed" />;
    }

    return (
      <form>
        <select name="type" onChange={this.onChange} >
          <option>Please select:</option>
          {this.renderOptions(FeedEntryTypes)}
        </select>
        <input type="text" placeholder="URL" name="url" onChange={this.onChange} />
        <input type="button" onClick={() => this.onSubmit(this.state)} value="Update" />
      </form>
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
