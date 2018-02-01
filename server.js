'use strict';

const Composer = require('./index');

const startServer = async () => {

    try {
        const server = await Composer();
        await server.start();
        console.log('Started the plot device on port ' + server.info.port);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();
