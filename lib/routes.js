'use strict';

// constan properties
const Pages = require('./controllers/pages');
const Assets = require('./controllers/assets');

// exports modules
module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: Pages.home
    },
    {
        method:'GET',
        path: '/product/{_id}',
        handler: Pages.product
    },
    {
        method: 'GET',
        path: '/reservation',
        handler: Pages.reservation
    },
    {
        method: 'GET',
        path: '/public/{params*}',
        handler:Assets.servePublicDirectory
    }
];
