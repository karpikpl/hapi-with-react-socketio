'use strict';
const Package = require('../../package.json');

const myDataStore = {
  isOn: true
};

const register = function(server, options) {
  server.route({
    method: 'GET',
    path: '/',
    options: {
      handler: (request, h) => {
        return {
          message: 'Welcome to the hapi-with-react-socketio tutorial.'
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
    path: '/isOn',
    options: {
      handler: (request, h) => {
        // fake data store - in memory
        return myDataStore;
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/isHealthy',
    options: {
      handler: (request, h) => {
        // fake data store - in memory
        if (myDataStore.isOn) {
          return `I'm ok`;
        }

        return h.response('API is OFF').code(503);
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/version',
    options: {
      handler: (request, h) => {
        return `Hello from ${Package.name} tutorial version ${Package.version}`;
      }
    }
  });
};

exports.plugin = {
  register,
  name: 'api'
};

exports.data = myDataStore;
