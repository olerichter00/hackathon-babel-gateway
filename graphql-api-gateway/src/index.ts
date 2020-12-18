import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import mercurius from 'mercurius'
import fp from 'fastify-plugin'
import { createGatewaySchema } from './graphql/schema'
import resolvers from './graphql/resolvers'
import fastifyPlugin from './plugins/fastifyPlugin'

require('dotenv').config()

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()

const start = async () => {
  try {
    server.register(mercurius, {
      schema: await createGatewaySchema(),
      resolvers,
    })

    server.post('/', async function (req, reply) {
      console.log(req.body)
      const query = (req.body as { query }).query as string
      return reply.graphql(query)
    })

    server.register(fp(fastifyPlugin))

    const port = process.env.PORT || 3000
    await server.listen(port, '0.0.0.0')

    console.log(`Server listening on port ${port}`)
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
