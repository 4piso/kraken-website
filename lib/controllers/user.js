'use strict';

// calling the modules ==========================
const Wreck = require('wreck');

// internals ====================================
const internals = {};

// home login ===================================
internals.homeLogin = (request, reply) => {

    // call the login view
    console.log(request.auth);
    reply.view('login');

};

// user sign up view ============================
internals.homeSignUp = (request, reply) => {

    reply.view('signup');
};

// user sign up =================================
internals.signup = (request, reply) => {

    // constant properties
    const apiUrl = 'http://localhost:8000' + '/user/';


    Wreck.request('post', apiUrl, { headers:{} , payload: JSON.stringify(request.payload), json: true }, (err, res, payload) => {

        if (err) {

            throw err;
        }

        reply.redirect('/signup');

    });

};

// home access ==================================
internals.validateLogin = (request, callback) => {

    // constant properties
    const apiUrl = `${request.server.app.urls.api}/user/login/`;

    // calling the webservices
    Wreck.request('post', apiUrl,{ payload: JSON.stringify(request.payload), json: true }, (err, res, payload) => {

        // if there is an error throw the errors
        if (err) {
            return callback(err, false, null);
        }

        Wreck.read(res, { json: true }, (err, body) => {

            if (err) {
                return callback(err, false, null);
            }

            if (body.status === 'success') {
                return callback(null, true, body.data);
            }
            else if (body.status === 'fail') {
                return callback(body.data.message, false, {});
            }

            return callback(null, false, {});
        });
    });
};

// exposing the Internals =======================
module.exports = internals;
