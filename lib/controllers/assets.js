'use strict';

const Path = require('path');

exports.servePublicDirectory = {
    directory: {
        path: Path.join(__dirname, '..','public'),
        index: false,
        redirectToSlash: false
    }
};
