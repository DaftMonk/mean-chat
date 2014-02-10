var _ = require('lodash'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

// users in chatroom
var visitors = {};

// only keep track of most recent messages
var messageQueue = (function(size){
  var queue = [];

  queue.push = function(a) {
    if(this.length >= size) this.shift();
    return Array.prototype.push.apply(this, arguments);
  };

  return queue;
})(15);

// placeholder info for user who's not registered
var unauthorizedUser = {
  name: 'unknown',
  profileImg: 'http://bower.io/img/bower-logo.png',
  role: 'guest'
};

// send the user on connection
exports.initUser = function(socket, user) {
  if(user.logged_in === false) {
    return socket.emit('init', {
      user: unauthorizedUser
    });
  }
  socket.emit('init', {
    user: user
  });
};

// update visitors list for everyone
exports.joinRoom = function(socket, user) {
  if(user.logged_in !== false) {
    visitors[user.id] = user;
  }
  var data = {
    visitors: _.toArray(visitors),
    messages: messageQueue
  };
  socket.broadcast.emit('join', data);
  socket.emit('join', data);
};

// broadcast user's message to other users
exports.sendMessage = function(socket, user, data) {
  if(user.logged_in === false) {
    return socket.emit('unauthorized', {
      messages: messageQueue
    });
  }

  messageQueue.push({
    author: user,
    body:   data.body,
    date:   Date.now()
  });
  socket.broadcast.emit('message', messageQueue);
};

// clean up when a user leaves, and broadcast to other users
exports.leaveRoom = function(io, socket, user) {
  if (visitors[user.id]) {
    delete visitors[user.id];
  }

  socket.broadcast.emit('leave', {
    user: user,
    visitors: _.toArray(visitors)
  });
};