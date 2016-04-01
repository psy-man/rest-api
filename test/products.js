import supertest from 'supertest';
import {assert} from 'chai';

import mongoose from 'mongoose';

const server = supertest.agent('http://localhost:8080');

describe('Products', () => {

  before(done => {
    mongoose.connect('mongodb://localhost/rest', () => {
      mongoose.connection.db.dropDatabase(() => done())
    });
  });

  let product1Id = null;

  const product1 = {
    title: 'iPhone 6s',
    brand: 'Apple',
    variants: [
      {title: 'gold', sku: 'QWERTY1'},
      {title: 'white', sku: 'QWERTY2'},
      {title: 'black'}
    ],
    images: [
      {
        url: 'http://o.aolcdn.com/hss/storage/midas/9a94ff50aaa65ec1262a2a50d6511843/202723760/iphones-fb.jpg',
        title: 'iPhone 6s and 6s Plus'
      },
      {url: 'http://i.telegraph.co.uk/multimedia/archive/03448/7iphone6s_3448302b.jpg'}
    ]
  };

  const product2 = {
    title: 'Nexus 5',
    brand: 'LG',
    variants: [
      {title: 'white'},
      {title: 'black'}
    ],
    images: [
      {url: 'http://cdn2.gsmarena.com/vv/pics/lg/lg-google-nexus-5-1.jpg'}
    ]
  };


  it('should create first product', done => {
    server
      .post('/products')
      .send(product1)
      .expect('Content-Type', "application/json")
      .expect(200)
      .end((err, res) => {

        assert.equal(err, null);
        assert.isOk(res.body.status);
        assert.equal(res.body.data.title, product1.title);
        assert.equal(res.body.data.brand, product1.brand);
        assert.equal(res.body.data.variants.length, product1.variants.length);
        assert.equal(res.body.data.variants[1].title, product1.variants[1].title);
        assert.equal(res.body.data.images.length, product1.images.length);
        assert.equal(res.body.data.images[0].url, product1.images[0].url);

        product1Id = res.body.data._id;
        done();
      });
  });

  it('should create second product', done => {
    server
      .post('/products')
      .send(product2)
      .expect('Content-Type', "application/json")
      .expect(200)
      .end((err, res) => {

        assert.equal(err, null);
        assert.isOk(res.body.status);
        assert.equal(res.body.data.title, product2.title);
        assert.equal(res.body.data.brand, product2.brand);
        assert.equal(res.body.data.variants.length, product2.variants.length);
        assert.equal(res.body.data.variants[1].title, product2.variants[1].title);
        assert.equal(res.body.data.images.length, product2.images.length);
        assert.equal(res.body.data.images[0].url, product2.images[0].url);

        done();
      });
  });

  it('should response that title is required', done => {
    server
      .post('/products')
      .send({brfand: 'HTC'})
      .expect('Content-Type', "application/json")
      .expect(500)
      .end((err, res) => {

        assert.equal(err, null);
        assert.isNotOk(res.body.status);
        assert.equal(res.body.data, 'Error: ValidationError: Title is required');
        new
          done();
      });
  });

  it('should update product by id', done => {
    server
      .put(`/products/${product1Id}`)
      .send({title: 'Now im Nokia!'})
      .expect(200)
      .end((err, res) => {

        assert.equal(err, null);
        assert.isOk(res.body.status);
        assert.equal(res.body.data.title, 'Now im Nokia!');
        assert.equal(res.body.data.brand, product1.brand);
        assert.equal(res.body.data.variants.length, product1.variants.length);
        assert.equal(res.body.data.variants[1].title, product1.variants[1].title);
        assert.equal(res.body.data.images.length, product1.images.length);
        assert.equal(res.body.data.images[0].url, product1.images[0].url);

        done();
      });
  });

  it('should get product by id', done => {
    server
      .get(`/products/${product1Id}`)
      .expect('Content-Type', "application/json")
      .expect(200)
      .end((err, res) => {

        assert.equal(err, null);
        assert.isOk(res.body.status);
        assert.equal(res.body.data.title, 'Now im Nokia!');
        assert.equal(res.body.data.brand, product1.brand);
        assert.equal(res.body.data.variants.length, product1.variants.length);
        assert.equal(res.body.data.variants[1].title, product1.variants[1].title);
        assert.equal(res.body.data.images.length, product1.images.length);
        assert.equal(res.body.data.images[0].url, product1.images[0].url);

        done();
      });
  });

  it('should return 404 error', done => {
    server
      .get(`/products/56cb91bdc3464f14678934ca`)
      .expect('Content-Type', "application/json")
      .expect(404)
      .end((err, res) => {

        assert.equal(err, null);
        assert.isNotOk(res.body.status);
        assert.equal(res.body.data, 'Error: Not found');

        done();
      });
  });

  it('should delete product', done => {
    server
      .delete(`/products/${product1Id}`)
      .expect('Content-Type', "application/json")
      .expect(200)
      .end((err, res) => {

        assert.equal(err, null);
        assert.isOk(res.body.status);
        assert.equal(res.body.data, 'Deleted!');

        done();
      });
  });

  it('should get products list', done => {
    server
      .get('/products')
      .expect('Content-Type', "application/json")
      .expect(200)
      .end((err, res) => {

        assert.equal(err, null);
        assert.isOk(res.body.status);
        assert.equal(res.body.data.length, 1);
        assert.equal(res.body.data[0].title, product2.title);

        done();
      });
  });
});