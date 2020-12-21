import translate from '../clients/translationClient'

const graphTranslator = async (
  obj: object,
  fromLanguage: string,
  toLanguage: string,
  keys: string[],
) => {
  if (typeof obj !== 'object') return obj

  const objectKeys = Object.keys(obj)

  for (const key of objectKeys) {
    const value = obj[key]

    if (typeof value === 'string' && keys.includes(key)) {
      obj[key] = await translate(value, fromLanguage, toLanguage)
    } else if (typeof value === 'object') {
      obj[key] = await graphTranslator(obj[key], fromLanguage, toLanguage, keys)
    }
  }

  return obj
}

export default graphTranslator
