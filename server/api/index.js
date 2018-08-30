'use strict';

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

    // Serve up all static content in build folder
    server.route({
        method: 'GET',
        path: '/anywhere/app/{path*}',
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
    name: 'api'
};
