'use strict';

// calling the modules ==========
const Wreck = require('wreck');

// internals ==========
const internals = {};

// home login
internals.homeLogin = (request, reply) => {

    // call the login view
    reply.view('login');

};

// home access
internals.login = (request, reply) => {

    // constant properties
    const apiUrl = 'http://localhost:8000' + '/user/';

    // calling the webservices
    Wreck.request('post', apiUrl,{ headers:{}, payload: JSON.stringify(request.payload), json: true }, (err, res, payload) => {

        // if there is an error throw the errors
        if (err) {

            throw err;

        }

        console.log(payload);

    });
};

// user sign up view
internals.homeSignUp = (request, reply) => {

    reply.view('signup');

};

// user sign up
internals.signup = (request, reply) => {

    // constant properties
    const apiUrl = 'http://localhost:8000' + '/user/';

    Wreck.request('post', apiUrl, { headers:{}, payload: JSON.stringify(request.payload), json: true }, (err, res, payload) => {

        if (err) {

            throw err;
        }

        reply.redirect('signup');

    });

};

// exposing the Internals
module.exports = internals;
