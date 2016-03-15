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

// create a product
internals.create = (request, reply) => {

    // constant property to get the url from services
    const apiUrl = 'http://localhost:8000' + '/service/';

    // get the api services
    Wreck.get(apiUrl, { json:true }, (err, res, payload) => {

        // if there is an error throw error
        if (err) {

            throw err;

        };

        // load the create product form view, pass the category with the id
        reply.view('create-product', {
            category: payload.data
        });

    });


};

// sending the payload to the api Servers
internals.createProduct = (request, reply) => {

    // constant properties
    const apiUrl = 'http://localhost:8000' + '/product/';

    console.log(JSON.stringify(request.payload));


    // send the post rquest on a json file
    Wreck.request('post', apiUrl, { headers:{} , payload: JSON.stringify(request.payload), json: true }, (err, res, payload) => {

        // if there is an error throw an error;
        if (err) {

            throw err;

        };

        // redirect fo the form
        reply.redirect('/create-product');

    });

};

// reservation method ===========================
internals.reservation = (request, reply) => {

    // return the book views
    reply.view('reservation');
};

// Exposing =====================================
module.exports = internals;
