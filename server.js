'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// Passport Configuration
var passport = require('./lib/config/passport');

var app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

// Express settings
var expressConfig = require('./lib/config/express');
expressConfig.init(app);

// Socket.io configuration
require('./lib/config/socket')(io, app, passport, expressConfig);

// Routing
require('./lib/routes')(app);

// Start server
server.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;