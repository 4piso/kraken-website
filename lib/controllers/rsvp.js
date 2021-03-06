'use strict';

// load Modules ============
const Wreck = require('wreck');
// global scope
const internals = {};

// home directory of the rsvp
internals.home = (request, reply) => {

    // local constants for the url api
    const apiUrl = 'http://localhost:8000' + '/product/service/' + request.params._id;

    console.log(apiUrl);

    // get the wrestul api with the id of the product
    Wreck.get(apiUrl, { json:true }, (err,res, payload ) => {

        // if there is an error show and log ig
        if (err) {

            throw err;
        }

        // send the pages to the rspv pages with the scheduler feature
        if (payload.status === 'success') {

            console.log(payload.data);

            reply.view('reservation', {
                products: payload.data
            });


        } else {

            console.log(`There is a problem with the web services call: ${payload.status}`);
        };

    });
};

internals.getVendors = (request, reply) => {

    const apiUrl = 'http://localhost:8000' + '/vendor/getvendor/' + request.params._id;

    Wreck.get(apiUrl, { json:true }, (err, res, payload) => {

        if (err) {
            throw err;
        }

        if (payload.status === 'success') {

            reply.view('vendor', {
                vendors: payload.data
            });

        } else {

            console.log(`There is a problem with the webservies call: ${payload.status}`);
        };
    });

};

// exposing the internal
module.exports = internals;
