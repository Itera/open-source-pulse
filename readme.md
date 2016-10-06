# open-source-pulse

## Setup project
Make sure you have Redis running. Put credentials in secrets.json or in environment variables.

```
npm install
npm start
```

This will give you a server running on http://127.0.0.1:3000. It is important that you use
127.0.0.1 and not localhost for the authentication with Github to work.

## API - `/graphql`

The API is in GraphQL, graphiql explorer is active on the endpoint. See `backend/schema.js`
for information on the schema available.
