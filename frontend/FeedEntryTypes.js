const FeedEntryTypes = [
  {
    key: 'WORKING_ON_ISSUE',
    description: 'A github issue you wish to fix',
    feedText: 'is working on',
  },
  {
    key: 'CREATED_ISSUE',
    description: 'A github issue you created',
    feedText: 'created an issue on',
  },
  {
    key: 'CODING_REPOSITORIY',
    description: 'The project repo you wish to send a request to (if no issue exists)',
    feedText: 'is working on',
  },
  {
    key: 'TRIAGING_REPOSITORY',
    description: 'Your pull request',
    feedText: 'is triaging issues on',
  },
  {
    key: 'CREAED_PR',
    description: 'Your pull request',
    feedText: 'created a PR on',
  },
];

export default FeedEntryTypes;
