'use strict';

// Load Modules =================================
const Boom = require('boom');
const Hoek = require('hoek');

// Internals ====================================
const internals = {};
internals.implementation = (server, options) => {

    Hoek.assert(options, 'Missing basic auth strategy options');
    Hoek.assert(typeof options.validateFunc === 'function', 'options.validateFunc must be a valid function in basic scheme');

    const settings = Hoek.clone(options);

    const scheme = {
        options: {
            payload: true
        },
        authenticate: (request, reply) => {

            return reply.continue({ credentials: {} });
        },
        payload: (request, reply) => {

            settings.validateFunc(request, (err, isValid, credentials) => {

                credentials = credentials || null;

                if (err) {
                    return reply(Boom.unauthorized(err), null, { credentials: credentials });
                }

                if (!isValid) {
                    return reply(Boom.unauthorized('Bad username or password'), null, { credentials: credentials });
                }

                if (!credentials ||
                    typeof credentials !== 'object') {

                    return reply(Boom.badImplementation('Bad credentials object received for Basic auth validation'));
                }

                // Authenticated
                return reply.continue({ credentials: credentials });
            });
        }
    };

    return scheme;
};

// Exposing =====================================
exports.register = function (plugin, options, next) {

    plugin.auth.scheme('custom', internals.implementation);
    next();
};

exports.register.attributes = {
    pkg: require('../../package.json')
};
