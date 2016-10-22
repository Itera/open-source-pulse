const FeedEntryTypes = [
  {
    key: 'WORKING_ON_ISSUE',
    description: 'A github issue you wish to fix',
    feedText: 'is working on',
    urlPlaceholder: 'URL to issue',
  },
  {
    key: 'CREATED_ISSUE',
    description: 'A github issue you have created',
    feedText: 'created an issue on',
    urlPlaceholder: 'URL to issue',
  },
  {
    key: 'CODING_REPOSITORIY',
    description: 'The project repo you wish to send a request to (if no issue exists)',
    feedText: 'is working on',
    urlPlaceholder: 'URL to repository',
  },
  {
    key: 'TRIAGING_REPOSITORY',
    description: 'Triaging issues on repo',
    feedText: 'is triaging issues on',
    urlPlaceholder: 'URL to repository',
  },
  {
    key: 'CREATED_PR',
    description: 'Your pull request',
    feedText: 'created a PR on',
    urlPlaceholder: 'URL to pull-request',
  },
];

export default FeedEntryTypes;
