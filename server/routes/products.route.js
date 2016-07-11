(function() {
  'use strict';

  var productController = require('./../controllers/product');
  function roleRoute(router) {
    //get all products
    router.route('/product/products')
      .get(productController.getAllProducts);

      //create a new product
    router.route('/product')
      .post(productController.createProduct);
  }

  module.exports = roleRoute;
})();
