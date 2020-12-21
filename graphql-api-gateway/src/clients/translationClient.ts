const translatte = require('translatte')

const translate = async (value: string, from: string, to: string): Promise<string> =>
  await translatte(value, { from, to }).text

export default translate
