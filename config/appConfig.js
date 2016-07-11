(function() {
  'use strict';


var express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  routes = require('./../server/routes/index'),
  path = require('path'),

  router = express.Router();
  routes(router);

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', router);

app.get('/*', function (req, res){
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

module.exports = app;

})();
