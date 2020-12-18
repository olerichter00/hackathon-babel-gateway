import translator from '../utils/translator'

const SOURCE_LANGUAGE = 'de'
const DEFAULT_LANGUAGE = 'en'

function translationPlugin(instance, options, next) {
  instance.addHook('onSend', async (request, reply, payload) => {
    const myRequest = request
    const locale =
      (request.headers['accept-language'] && request.headers['accept-language'].slice(0, 2)) ||
      DEFAULT_LANGUAGE

    const translatedPayload = await translator(JSON.parse(payload), SOURCE_LANGUAGE, locale)

    return JSON.stringify(translatedPayload)
  })

  return next()
}

export default translationPlugin
