'use strict';
const Pug = require('pug');
const Path = require('path');

const register = function (server, options) {

    server.views({
        engines: {
            pug: Pug
        },
        relativeTo: __dirname,
        path: '.'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {

            return h.view('index');
        }
    });

    // Serve up all static content in build folder
    server.route({
        method: 'GET',
        path: '/app/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '../../client/build/'),
                listing: false,
                index: true
            }
        }
    });
};

exports.plugin = {
    register,
    name: 'web',
    dependencies: ['vision']
};
