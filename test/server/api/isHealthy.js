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

lab.experiment('API health check - GET /api/isHealthy', () => {
  lab.afterEach(async () => {
    // little hacky - set state before each test
    // since module references are cached -
    // this test and server are using the same object
    DataStore.isOn = true;
  });

  lab.test('it gets the health of the API when its on', async () => {
    const request = {
      method: 'GET',
      url: '/api/isHealthy'
    };

    DataStore.isOn = true;
    const response = await server.inject(request);

    Code.expect(response.result).to.equal(`I'm ok`);
    Code.expect(response.statusCode).to.equal(200);
  });

  lab.test('it gets the health of the API when its off', async () => {
    const request = {
      method: 'GET',
      url: '/api/isHealthy'
    };

    DataStore.isOn = false;
    const response = await server.inject(request);

    Code.expect(response.result).to.match(/OFF/i);
    Code.expect(response.statusCode).to.equal(503);
  });
});
