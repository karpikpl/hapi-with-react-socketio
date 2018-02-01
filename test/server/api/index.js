'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const IndexPlugin = require('../../../server/api/index');


const lab = exports.lab = Lab.script();
let server;


lab.beforeEach(async () => {

    const plugins = {
        plugin: {
            name: 'api',
            register: IndexPlugin.register
        },
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
            url: '/'
        };

        return await server.inject(request, (response) => {

            Code.expect(response.result.message).to.match(/welcome to the plot device/i);
            Code.expect(response.statusCode).to.equal(200);
        });
    });
});
