
const { match } = require('../../common/patternMatching')
const devices = require('../../model/devices')
const { listDevicesCmd, setValueCmd, switchCmd } = require('./constants')


function handleListDevices() {
    return Object.entries(devices)
        .map((device, i) => [i + 1, `${device[0]}, ${Object.entries(device[1])
            .reduce((str, entry) => `${str} ${entry[0]}: ${entry[1]}`, '')}`])
        .join('\n')
}

function setValueHandler() {

}

function switchHandler() {

}

module.exports = {
    handleListDevices,
    setValueHandler,
    switchHandler,
}