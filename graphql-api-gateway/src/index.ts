import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchSchemas } from '@graphql-tools/stitch'
import mercurius from 'mercurius'

import { gatewaySchema as schema } from './graphql/schema'
import resolvers from './graphql/resolvers'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()

server.register(mercurius, {
  schema,
  resolvers,
})

server.post('/', async function (req, reply) {
  const query = '{ add(x: 2, y: 2) }'
  return reply.graphql(query)
})

const start = async () => {
  try {
    await server.listen(3000, '0.0.0.0')

    console.log(`Server listening on port 3000`)
  } catch (err) {
    console.log(err)
    server.log.error(err)
    process.exit(1)
  }
}

process.on('uncaughtException', error => {
  console.error(error)
})
process.on('unhandledRejection', error => {
  console.error(error)
})

start()
