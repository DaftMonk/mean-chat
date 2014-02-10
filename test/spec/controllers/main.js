'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('chatApp'));

  var MainCtrl,
    scope, socketMock;

  beforeEach(inject(function($controller, $rootScope){
    //create an empty scope
    scope = $rootScope.$new();
    socketMock = new SocketMock($rootScope);

    //declare the controller and inject our mock
    MainCtrl = $controller('MainCtrl', {$scope: scope, mySocket: socketMock});
  }));

  /*
  Mock for socket.io
   */
  var SocketMock = function($rootScope){
    this.events = {};
    this.emits = {};

    this.reconnect = function() {
    };

    // intercept 'on' calls and capture the callbacks
    this.on = function(eventName, callback){
      if(!this.events[eventName]) this.events[eventName] = [];
      this.events[eventName].push(callback);
    };

    // intercept 'emit' calls from the client and record them to assert against in the test
    this.emit = function(eventName){
      var args = Array.prototype.slice.call(arguments, 1);

      if(!this.emits[eventName])
        this.emits[eventName] = [];
      this.emits[eventName].push(args);
    };

    //simulate an inbound message to the socket from the server (only called from the test)
    this.receive = function(eventName){
      var args = Array.prototype.slice.call(arguments, 1);

      if(this.events[eventName]){
        angular.forEach(this.events[eventName], function(callback){
          $rootScope.$apply(function() {
            callback.apply(this, args);
          });
        });
      }
    };
  };

});
