const optional = require('./optional')

const emptyString = ''


function trimOrEmpty(str) {
    return optional(str)
            .filter(s => typeof s === 'string')
            .map(s => s.trim())
            .orElse(emptyString)
}

module.exports = Object.freeze({
    trimOrEmpty,
    emptyString,
})