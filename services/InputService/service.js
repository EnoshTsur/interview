const { match } = require("../../common/patternMatching")
const { trimOrEmpty } = require("../../common/stringutils")
const { isDeviceCommand } = require("../devicesService/utils")
const { handleDevice, } = require("../devicesService/service")
const optional = require("../../common/optional")
const { isFunction } = require("../../common/functions")

function handleData(input) {
    try {
        console.log(
            match(trimOrEmpty(input))
                .when(isDeviceCommand, handleDevice)
                .orElse('Unknown input')
        )
    } catch (error) {
        console.error(error)
    }
}

function handleError(error, handlerFunction) {
    optional(handlerFunction)
        .filter(isFunction)
        .ifPresent(handler => handler(error))
    console.error(error)
    return error
}


function handleClose(message, closingOperations) {
    optional(closingOperations)
        .filter(isFunction)
        .ifPresent(closingFn => {
            try {
                closingFn()
            } catch (error) {
                console.error(error)
            }
        })
    console.log(message)
    return message
}



module.exports = Object.freeze({
    handleData,
    handleClose,
    handleError
})