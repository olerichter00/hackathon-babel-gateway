import translate from '../clients/translationClient'

const TRANSLATION_KEYS = ['fullName']

const translator = async (obj, fromLanguage, toLanguage) => {
  const keys = Object.keys(obj)

  for (const key of keys) {
    const value = obj[key]

    if (typeof value === 'string' && TRANSLATION_KEYS.includes(key)) {
      obj[key] = await translate(value, fromLanguage, toLanguage)
    } else if (typeof value === 'object') {
      obj[key] = await translator(obj[key], fromLanguage, toLanguage)
    }
  }

  return obj
}

export default translator
