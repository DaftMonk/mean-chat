'use strict';

describe('Service: chatroom', function () {

  // load the service's module
  beforeEach(module('chatApp'));

  // mock mySocket
  var chatroom;
  beforeEach(function ($rootScope) {
    var mockSocket = new SocketMock();

    module(function ($provide) {
        $provide.value('mySocket', mockSocket);
    });
  });

  // instantiate service
  beforeEach(inject(function (_chatroom_) {
    chatroom = _chatroom_;
  }));

  it('should do something', function () {
    expect(!!chatroom).toBe(true);
  });

  /*
  Mock for socket.io
   */
  var SocketMock = function($rootScope){

    this.reconnect = function() {
    };

    this.on = function(eventName, callback){
    };

    this.emit = function(eventName){
    };

    this.receive = function(eventName){
    };
  };
});
