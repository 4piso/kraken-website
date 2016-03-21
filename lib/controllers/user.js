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
    const apiUrl = 'http://localhost:8000' + '/user/login/';

    // calling the webservices
    Wreck.request('post', apiUrl,{ headers:{}, payload: JSON.stringify(request.payload), json: true }, (err, res, payload) => {

        // if there is an error throw the errors
        if (err) {

            throw err;

        }

        // console.log(payload);
        //
        // request.session.set('user', {
        //     loggedIn: true,
        //     token: payload.token
        // });

        console.log(res.statusCode);

        if (res.statusCode !== 200){

            console.log('There is a problem')

        }else{

            Wreck.read(res, null, (err, body) => {

                // global properties
                const payload = JSON.parse(body);

                // set the response on the cookie
                request.cookieAuth.set({
                    fname: payload.data.fname,
                    lname: payload.data.lname,
                    token: payload.data.jwt.token
                });

                console.log(request.auth);
                reply.redirect('/');
            });

        };

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


    Wreck.request('post', apiUrl, { headers:{} , payload: JSON.stringify(request.payload), json: true }, (err, res, payload) => {

        if (err) {

            throw err;
        }

        reply.redirect('/signup');

    });

};

// exposing the Internals
module.exports = internals;
