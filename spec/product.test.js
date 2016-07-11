(function() {
  'use strict';

  var productSeeder = require('./../seeders/productSeeder'),
    server = require('./../server'),
    request = require('supertest')(server),
    product = require('./../models/products'),
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

        it('creates a new product', function() {
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
      });
    });
})();
