// Include Nodejs' net module.
const { handleInput, } = require('./services/devicesService/service')
const Net = require('net');
const { match } = require('./common/patternMatching');
const devicesKeys = require('./services/devicesService/constants');
const { trimOrEmpty } = require('./common/stringutils');
const { isDeviceCommand } = require('./services/devicesService/utils');
const { PORT, } = require('./configuration/tcp');
const { handleClose, handleData, handleError } = require('./services/InputService/service');


const server = new Net.Server();
server.listen(PORT, () => console.log(`Server listening for connection requests on socket localhost:${PORT}`));

server.on('connection', socket => {
    console.log('A new connection has been established.');

    socket.setEncoding('utf8')
    socket.on('data',handleData)

    socket.on('end', handleClose);

    socket.on('error', handleError);
});