import { AWSTranslateJSON } from 'aws-translate-json'

const awsConfig = {
  accessKeyId: 'akid',
  secretAccessKey: 'secret',
  region: 'eu-west-1',
}

const source = 'de'
const taget = ['en']

const { translateJSON } = new AWSTranslateJSON(awsConfig, source, taget)

const translate = () => {
  translateJSON({
    key1: 'Wasser bitte',
  }).then(console.log)
}

export default translate
