'use strict';

// Load Modules =================================
const Path = require('path');

// Exposing =====================================
exports.servePublicDirectory = {
    directory: {
        path: Path.join(__dirname, '..','public'),
        index: false,
        redirectToSlash: false
    }
};

exports.test = (request, reply) => {

    reply.view('test');
};
