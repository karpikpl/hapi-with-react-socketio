'use strict';
const Fs = require('fs');
const Util = require('util');
const Path = require('path');
const ReadFile = Util.promisify(Fs.readFile);

const myDataStore = {
    isOn: true
};

const register = function (server, options) {

    server.route({
        method: 'GET',
        path: '/',
        options: {
            handler: (request, h) => {

                return {
                    message: 'Welcome to the plot device.'
                };
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/isOn',
        options: {
            handler: (request, h) => {

                if (request.payload && request.payload.isOn != undefined) {
                    myDataStore.isOn = request.payload.isOn;
                }

                // fake data store - in memory
                return myDataStore;
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/version',
        options: {
            handler: async (request, h) => {

                if (myDataStore.isOn) {
                    const infoString = await ReadFile(Path.join(__dirname, '../../package.json'));
                    const info = JSON.parse(infoString);
                    return `Hello from ${info.name} tutorial version ${info.version}`;
                }

                return h.response('API is OFF').code(503);
            }
        }
    });
};

exports.plugin = {
    register,
    name: 'api'
};

exports.data = myDataStore;
