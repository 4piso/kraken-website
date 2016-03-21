'use strict';

// Load Modules =================================
const Product = require('./controllers/product');
const Assets = require('./controllers/assets');
const User = require('./controllers/user');
const Handlebars = require('handlebars');

// Exposing Plugin ==============================
exports.register = (plugin, options, next) => {

    plugin.auth.strategy('facebook', 'bell', {
        provider: 'facebook',
        password: 'cookie_encryption_password_secure',
        isSecure: false,
        clientId: '986156008136263',
        clientSecret: 'c58bbb25ad61f113bc4132015e4c9b6d',
        location: plugin.info.uri
    });

    // auth strategy
    // plugin.auth.strategy('session', 'cookie', true, {
    //
    //     password:'password-should-be-32-characters',
    //     cookie: "kraken-website",
    //     isSecure: false
    // });
    // routes
    plugin.route([
        { method: 'GET', path: '/', handler: Product.home },
        { method: 'GET', path: '/product/{_id}', handler: Product.product },
        { method: 'GET', path: '/create-product', handler: Product.create },
        { method: 'POST', path: '/create-product', config: { payload: { output: 'data' } },  handler: Product.createProduct },
        { method: 'GET', path: '/login', handler: User.homeLogin },
        { method: 'POST', path: '/login', config: {  payload: { output: 'data' } },  handler: User.login },
        { method: 'GET', path: '/signup', handler: User.homeSignUp },
        { method: 'POST', path: '/signup', config: { payload: { output: 'data' } },  handler: User.signup },
        { method: 'GET', path: '/public/{params*}', handler: Assets.servePublicDirectory },
        { method: 'GET', path: '/test/', handler: Assets.test },
        {
            method: 'GET',
            path: '/bell-fb',
            config: {
                auth: {
                    strategy: 'facebook',
                    mode: 'try'
                },
                handler: (request, reply) => {

                    if (!request.auth.isAuthenticated) {
                        return reply('Authentication failed due to: ' + request.auth.error.message);
                    }

                    reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>');
                }
            }
        }
    ]);

    // server views engines
    plugin.views({
        engines: { hbs: Handlebars },
        relativeTo: __dirname,
        path: __dirname + '/views',
        layoutPath: __dirname + '/views/layout',
        layout: true,
        isCached: false,
        helpersPath: __dirname + '/views/helpers',
        partialsPath: __dirname + '/views/partials'
    });

    // call next function
    next();
};

exports.register.attributes = {
    name: 'routes',
    version: require('../package.json').version
};
