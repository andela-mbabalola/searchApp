(function() {
  'use strict';

  var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  var productSchema = new Schema({
    name: {
      type: String,
      required: true,
      validate: {
        validator: function(title) {
          return /\w/.test(title);
        },
        message: '{VALUE} is not a valid name!'
      }
    },
    category: {
      type: String,
      required: true,
      validate: {
        validator: function(category) {
          return /\w/.test(category);
        },
        message: '{VALUE} is not a valid category!'
      }
    },
    details: {
      type: String,
      required: true,
      validate: {
        validator: function(category) {
          return /\w/.test(category);
        },
        message: '{VALUE} is not a valid category!'
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });

  var Product = mongoose.model('Product', productSchema);
  module.exports = Product;
})();
