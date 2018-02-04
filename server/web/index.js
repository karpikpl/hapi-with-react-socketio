'use strict';
const Pug = require('pug');

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
};

exports.plugin = {
    register,
    name: 'web',
    dependencies: ['vision']
};
