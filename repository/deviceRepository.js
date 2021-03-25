
const optional = require("../common/optional");
const devices = require("../model/devices");


function isUnknownDevice(device) {
    return !Object.keys(devices).includes(device)
}
function switchState(device) {
    if(isUnknownDevice(device)) {
        throw Error(`No such a device ${device}`)
    }
    devices[device].switchState = !devices[device].switchState
}

function setTemperature(amount) {
    const temperatureNumber = Number(amount)
    if(isNaN(temperatureNumber)) {
        throw Error(`temperature amount should be a number ${amount}`)
    }
    devices['airConditionar'].temperature = amount
}

module.exports = {
    switchState,
    setTemperature
}