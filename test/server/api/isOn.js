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

lab.experiment('API on/off switch - PUT /api/isOn', () => {
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

lab.experiment('API on/off switch - GET /api/isOn', () => {
  lab.afterEach(async () => {
    // little hacky - set state before each test
    // since module references are cached -
    // this test and server are using the same object
    DataStore.isOn = true;
  });

  lab.test('it gets the status of the API when its on', async () => {
    const request = {
      method: 'GET',
      url: '/api/isOn'
    };

    DataStore.isOn = true;
    const response = await server.inject(request);

    Code.expect(response.result.isOn).to.be.true();
    Code.expect(response.statusCode).to.equal(200);
  });

  lab.test('it gets the status of the API when its off', async () => {
    const request = {
      method: 'GET',
      url: '/api/isOn'
    };

    DataStore.isOn = false;
    const response = await server.inject(request);

    Code.expect(response.result.isOn).to.be.false();
    Code.expect(response.statusCode).to.equal(200);
  });
});
