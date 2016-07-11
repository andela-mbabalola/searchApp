(function() {
  'use strict';

  var Product = require('./../models/products');

  exports.createProduct = function(req,res) {
    Product.findOne({
      name: req.body.name
    }, function(err, product) {
      if (err) {
        res.send(err);
      } else {
        if (product) {
          res.status(409).json({
            message: 'Product already exists'
          });
        } else {
          var newProduct = {
            name: req.body.name,
            category: req.body.category,
            datails: req.body.details
          };
          newProduct.save(function(err) {
            if(err) {
              res.send(err);
            } else {
              res.status(200).json({
                message: 'Product Successfully created'
              });
            }
          });
        }
      }
    });
  };

  exports.getAllProducts = function(req,res) {
    Product.find({}, function(err, products) {
      if(err) {
        res.send(err);
      } else {
        res.status(200).json(products);
      }
    });
  };
})();
