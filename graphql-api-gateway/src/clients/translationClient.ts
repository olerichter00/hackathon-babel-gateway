const translatte = require('translatte');

const translate = async (msg: string, source= "de", target = "en"): Promise<string> => {
    return await translatte(msg, { from: source, to: target }).then(res => {
        return res.text
    }).catch(err => {
        throw console.error(err)
    });
}

export default translate
