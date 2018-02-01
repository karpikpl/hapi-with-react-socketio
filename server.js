'use strict';

const Composer = require('./index');

const startServer = async () => {

    try {
        const server = await Composer();
        await server.start();
        console.log('Started the plot device on port ' + server.info.port);

        return server;
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer().then((server) => {

    server.events.on('response', (request) => {

        const logMsg = { msg: `${request.info.remoteAddress} : ${request.method.toUpperCase()} ${request.url.path} --> ${request.response.statusCode}` };

        if (request.response.statusCode >= 200 && request.response.statusCode < 399) {
            console.log(logMsg);
        }
        else {
            console.error(logMsg);
        }
    });
});
