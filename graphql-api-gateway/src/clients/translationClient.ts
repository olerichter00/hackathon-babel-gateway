const translatte = require('translatte');

export async function translate(msg: string, toLanguage: string): Promise<string> {
    return await translatte(msg, { to: toLanguage }).then(res => {
        return res.text
    }).catch(err => {
        throw console.error(err)
    });
}