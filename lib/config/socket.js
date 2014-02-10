var passportSocketIo = require('passport.socketio'),
    express = require('express'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    chatCtrl = require('../controllers/chat');

function onAuthorizeSuccess(data, accept){
  accept(null, true);
}

function onAuthorizeFail(data, message, error, accept){
  accept(null, true);
}

module.exports = function (io, app, passport, expressConfig) {
  // set authorization for socket.io
  io.set('authorization', passportSocketIo.authorize({
    passport:     passport,
    cookieParser: express.cookieParser,
    secret:       expressConfig.secret,
    store:        expressConfig.store,
    success:      onAuthorizeSuccess,
    fail:         onAuthorizeFail
  }));

  io.set('log level', 1); // reduce logging
  io.sockets.on('connection', function (socket) {
    var user = socket.handshake.user;

    chatCtrl.initUser(socket, user);
    chatCtrl.joinRoom(socket, user);

    socket.on('message', function(data) {
      chatCtrl.sendMessage(socket, user, data);
    });

    socket.on('disconnect', function onDisconnect() {
      chatCtrl.leaveRoom(io, socket, user);
    });
  });
};