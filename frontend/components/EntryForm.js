// @flow
import React from 'react';
import {map} from 'lodash/fp';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

const opts = [
  {
    key: 'ISSUE',
    description: 'A github issue you wish to fix'
  },
  {
    key: 'REPO',
    description: 'The project repo you wish to send a request to (if no issue exists)'
  },
  {
    key: 'PR',
    description: 'Your pull request'
  },
];

class EntryForm extends React.Component {
  state = {};

  onChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  renderOptions = map((option) => <option key={option.key} value={option.key}>{option.description}</option>);

  render() {
    return (
      <form>
        <select name="type" onChange={this.onChange} >
          <option>Please select:</option>
          {this.renderOptions(opts)}
        </select>
        <input type="text" placeholder="URL" name="url" onChange={this.onChange} />
        <input type="button" onClick={() => this.props.onSubmit(this.state)} value="Update"/>
      </form>
    )
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
  props: ({mutate}) => ({
    onSubmit: (feedItem) => mutate({variables: {feedItem}}),
  }),
})(EntryForm);
