"use strict";

import restify from 'restify';
import mongoose from 'mongoose';

import * as products from './controllers/products'





const server = restify.createServer({
    name: 'Simple rest API'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());
server.use(restify.requestLogger());

server.get('/products', products.list);
server.post('/products', products.create);
server.get('/products/:id', products.view);
server.put('/products/:id', products.update);


mongoose.connect('mongodb://localhost/rest', err => {

    if (err) {
        throw err;
    }

    server.listen(8080, () => {
        console.log('%s listening at %s', server.name, server.url);
    });
});

