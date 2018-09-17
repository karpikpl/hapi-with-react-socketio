'use strict';

const Lab = require('lab');
const Code = require('code');
const Composer = require('../../../index');

const lab = (exports.lab = Lab.script());
let server;

lab.beforeEach(async () => {
  server = await Composer();
});

lab.experiment('Home Page View', () => {
  lab.test('home page renders properly', async () => {
    const request = {
      method: 'GET',
      url: '/'
    };

    const response = await server.inject(request);

    Code.expect(response.result).to.match(/activate the plot device/i);
    Code.expect(response.statusCode).to.equal(200);
  });
});
