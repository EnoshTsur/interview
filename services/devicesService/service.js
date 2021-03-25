
const { match } = require('../../common/patternMatching')
const { listDevicesCmd, setValueCmd, switchCmd } = require('./constants')
const { handleListDevices, setValueHandler, switchHandler, } = require('./handlers')
const { isCommand } = require('./utils')


function handleDevice(input) {

    return match(input)
        .when(isCommand(listDevicesCmd.command), handleListDevices)
        .when(isCommand(setValueCmd.command), setValueHandler)
        .when(isCommand(switchCmd.command), switchHandler)
        .orElse()

}


module.exports = Object.freeze({ 
    handleDevice,
})