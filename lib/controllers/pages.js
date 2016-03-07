'use strict';

// Load Modules =================================
const Wreck = require('wreck');

// Internals ====================================
const internals = {};

// Home method ==================================
internals.home = (request, reply) => {

    const apiUrl = 'http://localhost:8000' + '/product';

    // using wreck to call the json api product
    Wreck.get(apiUrl, { json:true }, (err,res, payload) => {

        // if there is an error throw errors
        if (err) {
            throw err;
        }

        if (payload.status === 'success') {
            // return eveything
            reply.view('index', {
                products: payload.data
            });
        }
        else {
            console.log('there is a problem with the web services call:' + payload.status);
        }
    });
};

// controller to handler single products ========
internals.product = (request,reply) => {

    // constant property to get the url plus the url
    const apiUrl = 'http://localhost:8000' + '/product/' + request.params._id;

    // get the json api passing the product id
    Wreck.get(apiUrl, { json:true }, (err, res, payload) => {

        // if there is an error throw err
        if (err) {
            throw err;
        }
        // check the webservices call back
        if (payload.status === 'success') {
            // send everyting to the view
            reply.view('product-detail', {
                product: payload.data[0]
            });
        }
        else {
            // send the error
            console.log(`There is a problem with the web services call: ${payload.status}`);
        }
    });
};

// reservation method ===========================
internals.reservation = function (request, reply) {

    // return the book views
    reply.view('reservation');
};

// Exposing =====================================
module.exports = internals;
