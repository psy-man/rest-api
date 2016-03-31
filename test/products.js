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

    let id = null; 

    it('should create iPhone', done => {
        server
            .post('/products')
            .send({title: 'iPhone 6s'})
            .expect('Content-Type', "application/json")
            .expect(200)
            .end((err, res) => {

                assert.equal(err, null);
                assert.isOk(res.body.status);
                assert.equal(res.body.data.title, 'iPhone 6s');

                id = res.body.data._id;
                done();
            });
    });

    it('should create LG', done => {
        server
            .post('/products')
            .send({title: 'LG Nexus 5'})
            .expect('Content-Type', "application/json")
            .expect(200)
            .end((err, res) => {

                assert.equal(err, null);
                assert.isOk(res.body.status);
                assert.equal(res.body.data.title, 'LG Nexus 5');

                done();
            });
    });

    it('should update product by id', done => {
        server
            .put(`/products/${id}`)
            .send({title: 'Now im Nokia!'})
            .expect(200)
            .end((err, res) => {

                assert.equal(err, null);
                assert.isOk(res.body.status);
                assert.equal(res.body.data.title, 'Now im Nokia!');

                done();
            });
    });

    it('should get product by id', done => {
        server
            .get(`/products/${id}`)
            .expect('Content-Type', "application/json")
            .expect(200)
            .end((err, res) => {

                assert.equal(err, null);
                assert.isOk(res.body.status);
                assert.equal(res.body.data.title, 'Now im Nokia!');

                done();
            });
    });

    it('should show 404 error', done => {
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
            .delete(`/products/${id}`)
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

                done();
            });
    });
});