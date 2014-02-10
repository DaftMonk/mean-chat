'use strict';

angular.module('chatApp')
  .factory('chatroom', function (mySocket, $rootScope, $timeout, $location) {
    var messages = [];
    var visitors = [];

    // asynchronously trigger scroll to bottom
    var scrollToBottom = function() {
      $timeout(function() {
        $rootScope.$broadcast('event:scroll');
      });
    };

    // set currentUser to socket user
    mySocket.on('init', function (data) {
      $rootScope.currentUser = data.user;
    });

    // if unauthorized, reset messages and redirect to login
    mySocket.on('unauthorized', function (data) {
      messages = data.messages;
      $location.path('/login');
    });

    // update chatroom data
    mySocket.on('join', function (data) {
      visitors = data.visitors;
      messages = data.messages;
      scrollToBottom();
    });

    // update visitors
    mySocket.on('leave', function (data) {
      visitors = data.visitors;

      // if user closed connection somewhere else
      // reconnect to see if he's still logged in
      if(data.user._id === $rootScope.currentUser._id) {
        mySocket.reconnect();
      }
    });

    // update messages and scroll to bottom
    mySocket.on('message', function (messageQueue) {
      messages = messageQueue;
      scrollToBottom();
    });

    // Public API here
    return {
      getMessages: function() {
        return messages;
      },
      getVisitors: function() {
        return visitors;
      },
      sendMessage: function(message) {
        mySocket.emit( 'message', { body: message } );
        // push message locally
        messages.push( { body: message, author: $rootScope.currentUser, date: Date.now() });
        scrollToBottom();
      }
    };
  });
