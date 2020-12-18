import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import mercurius from 'mercurius'

import { createGatewaySchema } from './graphql/schema'
import resolvers from './graphql/resolvers'
import {translate} from './clients/translationClient'

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

    const port = process.env.PORT || 3000
    await server.listen(port, '0.0.0.0')

    console.log(`Server listening on port ${port}`)

    const msg = await translate("voce fala alemao?", "de");
    console.log(`Translated String ${msg}`)

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