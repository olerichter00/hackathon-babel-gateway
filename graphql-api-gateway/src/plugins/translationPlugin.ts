import graphTranslator from '../utils/graphTranslator'

type Options = {
  sourceLanguage: string
  defaultLanguage: string
  keys: string[]
}

function translationPlugin(instance, options: Options, next) {
  instance.addHook('onSend', async (request, _reply, payload) => {
    const locale =
      (request.headers['accept-language'] && request.headers['accept-language'].slice(0, 2)) ||
      options.defaultLanguage

    const translatedPayload = await graphTranslator(
      JSON.parse(payload),
      options.sourceLanguage,
      locale,
      options.keys,
    )

    return JSON.stringify(translatedPayload)
  })

  return next()
}

export default translationPlugin
