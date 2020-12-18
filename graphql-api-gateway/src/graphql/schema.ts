import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchSchemas } from '@graphql-tools/stitch'

let postsSchema = makeExecutableSchema({
  typeDefs: `
    type Post {
      id: ID!
      text: String
      userId: ID!
    }

    type Query {
      postById(id: ID!): Post
      postsByUserId(userId: ID!): [Post]!
    }
  `,
  resolvers: {},
})

let usersSchema = makeExecutableSchema({
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

// setup subschema configurations
export const postsSubschema = { schema: postsSchema }
export const usersSubschema = { schema: usersSchema }

// build the combined schema
export const gatewaySchema = stitchSchemas({
  subschemas: [postsSubschema, usersSubschema],
})
