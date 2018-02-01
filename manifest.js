'use strict';

const Confidence = require('confidence');
const Config = require('./config');

const criteria = {
    env: process.env.NODE_ENV
};


const manifest = {
    $meta: 'This file defines the plot device.',
    server: {
        debug: {
            request: ['error']
        },
        routes: {
            security: true
        },
        port: Config.get('/port/web')
    },
    register: {
        plugins: [
            {
                plugin:  'vision'
            },
            {
                plugin: {
                    name: 'api',
                    register: require('./server/api/index').register
                },
                routes: {
                    prefix: '/api'
                }
            },
            {
                plugin: {
                    name: 'web',
                    register: require('./server/web/index').register,
                    dependencies: 'vision'
                }
            }
        ]
    }
};


const store = new Confidence.Store(manifest);


exports.get = (key) => {

    return store.get(key, criteria);
};


exports.meta = (key) => {

    return store.meta(key, criteria);
};
