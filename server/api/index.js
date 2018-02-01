'use strict';

exports.register = function (server, options) {

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
