'use strict';

const Composer = require('./index');

const startServer = async () => {
  try {
    const server = await Composer();
    await server.start();
    console.log('Started the plot device app on port ' + server.info.port);

    return server;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
