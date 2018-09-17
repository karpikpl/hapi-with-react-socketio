'use strict';

const Lab = require('lab');
const Code = require('code');
const Composer = require('../../../index');
const DataStore = require('../../../server/api/index').data;

const lab = (exports.lab = Lab.script());
let server;

lab.beforeEach(async () => {
  server = await Composer();
});

lab.experiment('Index Plugin', () => {
  lab.test('it returns the default message', async () => {
    const request = {
      method: 'GET',
      url: '/api'
    };

    const response = await server.inject(request);

    Code.expect(response.result.message).to.match(
      /welcome to the plot device/i
    );
    Code.expect(response.statusCode).to.equal(200);
  });
});

lab.experiment('/api/version', () => {
  lab.beforeEach(async () => {
    // little hacky - set state before each test
    // since module references are cached -
    // this test and server are using the same object
    DataStore.isOn = true;
  });

  lab.afterEach(async () => {
    // little hacky - set state after each test
    // since module references are cached -
    // this test and server are using the same object
    DataStore.isOn = true;
  });

  lab.test('it returns the app name and version', async () => {
    const request = {
      method: 'GET',
      url: '/api/version'
    };

    const response = await server.inject(request);

    Code.expect(response.result).to.match(/hapi-with-react-socketio/i);
    Code.expect(response.statusCode).to.equal(200);
  });

  lab.test('it returns code 503 when API is off', async () => {
    DataStore.isOn = false;
    const request = {
      method: 'GET',
      url: '/api/version'
    };

    const response = await server.inject(request);

    Code.expect(response.result).to.match(/OFF/i);
    Code.expect(response.statusCode).to.equal(503);
  });
});

lab.experiment('/api/isOn', () => {
  lab.beforeEach(async () => {
    // little hacky - set state before each test
    // since module references are cached -
    // this test and server are using the same object
    DataStore.isOn = true;
  });

  lab.test('it turns off the API', async () => {
    const request = {
      method: 'PUT',
      url: '/api/isOn',
      payload: { isOn: false }
    };

    const response = await server.inject(request);

    Code.expect(response.result.isOn).to.be.false();
    Code.expect(response.statusCode).to.equal(200);
  });

  lab.test('it doesnt crash when payload is invalid', async () => {
    const request = {
      method: 'PUT',
      url: '/api/isOn'
    };

    const response = await server.inject(request);

    Code.expect(response.result.isOn).to.be.true();
    Code.expect(response.statusCode).to.equal(200);
  });
});
