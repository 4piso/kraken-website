'use strict';

// home controller
exports.home = function (request, reply) {

    // local properties
    const title = 'Browser of the product will be here';
    const productions = 'Cuarto Piso productions';

    reply.view('index',{
        title:title,
        productions:productions
    });
};

// reservation controller
exports.reservation = function (request, reply){

    // return the book views
    reply.view('reservation');

};
