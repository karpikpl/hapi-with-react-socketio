'use strict';
const Pug = require('pug');

exports.register = function (server, options) {

    server.views({
        engines: { pug: Pug },
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
