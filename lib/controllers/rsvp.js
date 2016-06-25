'use strict';

// load Modules ============
const Wreck = require('wreck');
// global scope
const internals = {};

// home directory of the rsvp
internals.home = (request, reply) => {

    // local constants for the url api
    const apiUrl = 'http://localhost:8000' + '/service/' + request.params._id;

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
                product: payload.data[0]
            });


        } else {

            console.log(`There is a problem with the web services call: ${payload.status}`);
        }

    });
};

// exposing the internal
module.exports = internals;
