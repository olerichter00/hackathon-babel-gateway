//const translatate = async (name, fromLanguage, toLanguage) => `${toLanguage}: ${name}

import { env } from 'process'

const { AWSTranslateJSON } = require('aws-translate-json')

const awsConfig = {
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.ACCESS_KEY,
  region: 'eu-west-1',
}

const translate = async (value: string, source = 'de', target = 'en') => {
  return `${source} - ${target}: ${value}`
  const { translateJSON } = new AWSTranslateJSON(awsConfig, source, [target])

  const result = await translateJSON({
    key1: value,
  })

  return result[target].key1
}

export default translate
