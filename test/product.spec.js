(function() {
  'use strict';

  var productSeeder = require('./../seeders/productSeeder'),
    server = require('./../server'),
    request = require('supertest')(server),
    product = require('./../server/models/products'),
    expect = require('expect.js');

    describe('Products', function() {
      describe('/POST: create a new product', function() {
        beforeEach(function(done) {
          product.create(productSeeder[1]).then(function(Product) {
            done();
          }, function(err) {
            console.log(err);
            done();
          });
        });
        afterEach(function(done) {
          product.remove({}).exec(function(err) {
            if(err) {
              console.log(err);
              done();
            }
            done();
          });
        });

        it('should connect to root', function(done) {
        request.get('/')
          .expect(200);
        done();
      });

        it('creates a new product', function(done) {
          request.post('/api/product')
          .send({
            name: productSeeder[0].name,
            category: productSeeder[0].category,
            details: productSeeder[0].details
          })
          .expect(200)
          .end(function(err, res) {
              expect(res.status).to.be(200);
              expect(res.body.message).to.equal('Product Successfully created');
              done();
          });
        });

        it('creates unique products', function(done) {
        request.post('/api/product')
          .send({
            name: productSeeder[1].name,
            category: productSeeder[1].category,
            details: productSeeder[1].details,
          })
          .expect(409)
          .end(function(err, res) {
            expect(res.status).to.be(409);
            expect(res.body.message).to.eql('Product already exists');
            done();
          });
      });

        it('does not create a product without name', function(done) {
          request.post('/api/product')
          .send({
            category: productSeeder[0].category,
            details: productSeeder[0].details
          })
          .end(function(err, res) {
              expect(res.body.message).to.equal('Product validation failed');
              done();
          });
        });

        it('return all products', function(done) {
        var aproduct = new product(productSeeder[0]);
        aproduct.save();

        request.get('/api/product/products')
          .expect(200)
          .end(function(err, res) {
            expect(res.status).to.be(200);
            expect(res.body.length).to.not.be(0);
            expect(res.body[0].name).to.be('second');
            expect(res.body[1].name).to.be('first');
            done();
          });
      });
      });
    });
})();
