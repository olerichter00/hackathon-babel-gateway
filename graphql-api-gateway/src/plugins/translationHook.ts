import translator from "../utils/translator"

const fp = require('fastify-plugin')

module.exports = fp(function (fastify, options, next) {

    // some code

    fastify.addHook('onSend', async (request, reply, payload, done) => {
      const jsonPayload = JSON.parse(payload)
      const newPayload = await translator(jsonPayload, 'de', 'en')
      const err = null
      debugger
      done(err, newPayload)
    })

    /* if (jsonResult.data.menu) {
      recipes = getRecipeNames(jsonResult.data.menu)
      translate(recipes[0][0])
    } */
    // error occurred
    /* if (err) {
      console.log(err)
      throw new Error('some errors occurred.')
    } */
  next()
})
