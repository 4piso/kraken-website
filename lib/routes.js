'use strict';

// constan properties
const Pages = require('./controllers/pages');
const Assets = require('./controllers/assets');
const Handlebars = require('handlebars');

// exposing the routes
exports.register =  (plugin, options, next) => {

    plugin.auth.strategy('facebook', 'bell', {
        provider: 'facebook',
        password: 'cookie_encryption_password_secure',
        isSecure: false,
        clientId: '1555947964715827',
        clientSecret: '770aca7ca7228028ebc99edad0d89855',
        location: plugin.info.uri
    });

    // routes
    plugin.route([
        { method: 'GET', path: '/', handler: Pages.home },
        { method: 'GET', path: '/product/{_id}', handler: Pages.product },
        { method: 'GET', path: '/public/{params*}', handler: Assets.servePublicDirectory },
        { method: 'GET',
           path: '/bell-fb',
           config:{
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

        engines:{ hbs: Handlebars },
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

// export the attributes
exports.register.attributes = {
    name: 'routes'
};
