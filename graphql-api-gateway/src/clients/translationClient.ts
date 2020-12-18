//const translatate = async (name, fromLanguage, toLanguage) => `${toLanguage}: ${name}

const { AWSTranslateJSON } = require('aws-translate-json');

const awsConfig = {
    accessKeyId: '...',
    secretAccessKey: 'D..',
    region: 'eu-west-1',
}

const translate = (recipe: string, source= "de", target = "en") => {
  const { translateJSON } = new AWSTranslateJSON(awsConfig, source, [target]);
  translateJSON({
    key1: recipe,
}).then(res => {
  return res["target"]
});
}

export default translate
