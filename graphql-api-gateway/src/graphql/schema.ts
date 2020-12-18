import { introspectSchema } from '@graphql-tools/wrap'
import { fetch } from 'cross-fetch'
import { print } from 'graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchSchemas } from '@graphql-tools/stitch'

let localSchema = makeExecutableSchema({
  typeDefs: `
    type User {
      id: ID!
      email: String
    }

    type Query {
      userById(id: ID!): User
      add(x: Int, y: Int): Int
    }
  `,
  resolvers: {},
})

async function remoteExecutor({ document, variables }) {
  const query = print(document)

  const fetchResult = await fetch(process.env.MARLEY_SPOON_API_HOST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.MARLEY_SPOON_API_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })
  const jsonResult = await fetchResult.json()

  debugger
  return jsonResult
}

export const localSubschema = { schema: localSchema }

export const marleyspoonSubschema = async () => ({
  schema: await introspectSchema(remoteExecutor),
  executor: remoteExecutor,
})

// build the combined schema
export const createGatewaySchema = async () =>
  stitchSchemas({
    subschemas: [localSubschema, await marleyspoonSubschema()],
  })
