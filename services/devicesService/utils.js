const optional = require('../../common/optional')
const { listDevicesCmd, setValueCmd, switchCmd, } = require('./constants')

function isDeviceCommand(str) {
     return Object.values([listDevicesCmd.command, setValueCmd.command, switchCmd.command])
          .find(command => str.includes(command)) != null
}

function extractCommand(str) {
     return optional(str)
          .filter(s => typeof s === 'string')
          .map(s => s.split(' ')[0])
          .orElse('')
}

function isCommand(command) {
     return str => extractCommand(str) === command
}

module.exports = Object.freeze({
     isDeviceCommand,
     extractCommand,
     isCommand,
})