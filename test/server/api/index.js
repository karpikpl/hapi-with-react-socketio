'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');

const lab = exports.lab = Lab.script();
let server;


lab.beforeEach(async () => {

    const plugins = {
        plugin: require('../../../server/api/index'),
        routes: {
            prefix: '/api'
        }
    };
    server = Hapi.Server({
        port: Config.get('/port/web')
    });
    return await server.register(plugins);
});


lab.experiment('Index Plugin', () => {

    lab.test('it returns the default message', async () => {

        const request = {
            method: 'GET',
            url: '/api'
        };

        const response = await server.inject(request);

        Code.expect(response.result.message)
            .to.match(/welcome to the plot device/i);
        Code.expect(response.statusCode)
            .to.equal(200);
    });
});
