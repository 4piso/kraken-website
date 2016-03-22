'use strict';

// Load Modules ==============================
const Hoek = require('hoek');
const Config = require('getconfig');
const Server = require('./lib');

// Declare internals ============================
const internals = {
    options: { relativeTo: `${__dirname}/lib` }
};

// Init Servers =================================
Server.init(Config.manifest, internals.options, (err, server) => {

    Hoek.assert(!err, err);

    // Server connections
    const web = server.select('web');

    server.app = Config.app;

    // Logging started server
    console.log('WEB server started at: ' + web.info.uri);
});
