'use strict';

// load modules =================
const Config = require('getconfig');
const Glue = require('glue');

const internals = {
    options: { relativeTo: __dirname }
};

// run the server
Glue.compose(Config.manifest, internals.options, (err, server) => {

    if (err){

        throw err;
    }

    // loaading the serve
    server.start((err) => {

        if (err){
            throw err;
        }
        // log the serer log
        console.log('Server running on: ' + server.info.uri);

    });
});
