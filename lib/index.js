'use strict';

// load modules =================
const Hapi = require('hapi');
const server = new Hapi.Server();

// server connections ===========
server.connection({
    port:4000
});

// binds for the url
server.bind({
    apiBaseUrl:"http://localhost:8000"
});

// plugins registers
server.register(require('./plugins'), (err) => {

    // log the errors
    if (err){
        throw err;
    }

    // configuration of the view services
    server.views({
        engines: {
            hbs:require('handlebars')
        },
        relativeTo: __dirname,
        path: './views',
        layoutPath: './views/layout',
        layout: true,
        isCached: false,
        helpersPath: './views/helpers',
        partialsPath: './views/partials'
    });

    // load the routes
    server.route(require('./routes'));

    // start the server
    server.start((err) => {

        if (err){
            throw err;
        }

        console.log('Server start at ' + server.info.uri);
    });
});
