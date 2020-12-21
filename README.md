# Marley Spoon Hackathon - Babel Gateway

### The universal translator for Marley Spoon

This project uses [GraphQL Schema Stitching](https://www.graphql-tools.com/docs/schema-stitching/) to create an API gateway wich translates specified GraphQL fields.


## Ideas

- A GraphQL API Gateway
- Graphql Schema Stitching
- External service for automated translation
- Middleware for translating fields for a list of keys (e.g. title, description)

## Development

Make sure `node` and `yarn` are installed

Install dependencies:

```shell
cd graphql-api-gateway
cp .env.example .env
yarn install
```

Start server:

```shell
yarn dev
open http:localhost:3000
```
