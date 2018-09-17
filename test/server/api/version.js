'use strict';

const Lab = require('lab');
const Code = require('code');
const Composer = require('../../../index');

const lab = (exports.lab = Lab.script());
let server;

lab.beforeEach(async () => {
  server = await Composer();
});

lab.experiment('Version Info - GET /api/version', () => {
  lab.test('it returns the app name and version', async () => {
    const request = {
      method: 'GET',
      url: '/api/version'
    };

    const response = await server.inject(request);

    Code.expect(response.result).to.match(/hapi-with-react-socketio/i);
    Code.expect(response.statusCode).to.equal(200);
  });
});
