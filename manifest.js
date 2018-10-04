'use strict';

const Confidence = require('confidence');
const Config = require('./config');

const criteria = {
  env: process.env.NODE_ENV
};

const manifest = {
  $meta: 'This file defines the hapi-with-react-socketio tutorial.',
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
        plugin: 'vision'
      },
      {
        plugin: 'inert'
      },
      {
        plugin: './server/api/index',
        routes: {
          prefix: '/api'
        }
      },
      './server/web/index',
      {
        plugin: 'good',
        options: {
          ops: {
            interval: 1000
          },
          reporters: {
            myConsoleReporter: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [
                  {
                    log: '*',
                    response: '*'
                  }
                ]
              },
              {
                module: 'good-console'
              },
              'stdout'
            ]
          }
        }
      },
      {
        plugin: 'lout',
        options: {
          endpoint: '/docs',
          apiVersion: '1.0.0'
        }
      }
    ]
  }
};

const store = new Confidence.Store(manifest);

exports.get = key => {
  return store.get(key, criteria);
};

exports.meta = key => {
  return store.meta(key, criteria);
};
