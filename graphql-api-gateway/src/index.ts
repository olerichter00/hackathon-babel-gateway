import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import mercurius from 'mercurius'
import fp from 'fastify-plugin'
import { createGatewaySchema } from './graphql/schema'
import resolvers from './graphql/resolvers'
import translationPlugin from './plugins/translationPlugin'

require('dotenv').config()

const TRANSLATION_KEYS = ['fullName']
const SOURCE_LANGUAGE = 'de'
const DEFAULT_LANGUAGE = 'en'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()

const start = async () => {
  try {
    server.register(mercurius, {
      schema: await createGatewaySchema(),
      resolvers,
    })

    server.post('/', async function (req, reply) {
      const query = (req.body as { query }).query as string

      return reply.graphql(query)
    })

    server.register(fp(translationPlugin), {
      keys: TRANSLATION_KEYS,
      sourceLanguage: SOURCE_LANGUAGE,
      defaultLanguage: DEFAULT_LANGUAGE,
    })

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
