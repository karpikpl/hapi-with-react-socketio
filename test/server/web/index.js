'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const Vision = require('vision');
const HomePlugin = require('../../../server/web/index');


const lab = exports.lab = Lab.script();
let server;


lab.beforeEach(async () => {

    const plugins = [{
        plugin:  Vision
    },
    {
        plugin: {
            name: 'web',
            register: HomePlugin.register,
            dependencies: 'vision'
        }
    }];
    server = Hapi.Server({
        port: Config.get('/port/web')
    });
    return await server.register(plugins);
});


lab.experiment('Home Page View', () => {

    lab.test('home page renders properly', async () => {

        const request = {
            method: 'GET',
            url: '/'
        };

        return await server.inject(request, (response) => {

            Code.expect(response.result).to.match(/activate the plot device/i);
            Code.expect(response.statusCode).to.equal(200);

        });
    });
});
