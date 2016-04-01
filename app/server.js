"use strict";

import mongoose from 'mongoose';
import restify from 'restify';

import * as products from './controllers/products'


const server = restify.createServer({
  name: 'Simple rest API'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());

server.get('/products', products.list);
server.post('/products', products.create);
server.get('/products/:id', products.view);
server.put('/products/:id', products.update);
server.del('/products/:id', products.remove);

mongoose.connect('mongodb://localhost/rest', err => {
  if (err) { throw err; }

  server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
  });
});

