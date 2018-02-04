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
};

exports.plugin = {
    register,
    name: 'api'
};
