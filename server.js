var mongoose = require('mongoose'),
  app = require('./config/appConfig'),
  db = require('./config/databaseConfig'),
  port = process.env.PORT || 3333;

mongoose.connect(db.url);

app.listen(port);
console.log('Successfully connected to ' + port);

module.exports = app;
