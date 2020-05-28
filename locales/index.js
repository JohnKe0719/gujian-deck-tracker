let source = {
    ...require('./locale1.js'),
}

let lang = [ 'en', 'tw', 'cn' ]
let messages = {}

for (let i = 0; i < lang.length; i++) {
    messages[lang[i]] = {}
    for (let key in source) {
        messages[lang[i]][key] = source[key][lang[i]] || ''
    }
}

module.exports = messages
