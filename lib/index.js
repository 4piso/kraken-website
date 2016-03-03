'use strict';

// load modules =================
const Hapi = require('hapi');
const server = new Hapi.Server();
const Config = require('getconfig');
const Glue = require("glue");

// server connections ===========
server.connection({
    port:4000
});

const options = {
    relativeTo: __dirname
}

// binds for the url
server.bind({
    apiBaseUrl:"http://localhost:8000"
})

// // plugins registers
// server.register(require('./plugins'), (err) => {
//
//     // log the errors
//     if (err){
//         throw err;
//     }
//
//     // configuration of the view services
//     server.views({
//         engines: {
//             hbs:require('handlebars')
//         },
//         relativeTo: __dirname,
//         path: './views',
//         layoutPath: './views/layout',
//         layout: true,
//         isCached: false,
//         helpersPath: './views/helpers',
//         partialsPath: './views/partials'
//     });
//
//     // load the routes
//     server.route(require('./routes'));
//
//     // start the server
//     server.start((err) => {
//
//         if (err){
//             throw err;
//         }
//
//         console.log('Server start at ' + server.info.uri);
//     });
// });

Glue.compose(Config.manifest, options, (err, server) => {

    server.start((err) => {

        console.log("Server is running on path " + server.info.uri);
    });
});
