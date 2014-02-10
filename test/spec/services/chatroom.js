'use strict';

describe('Service: chatroom', function () {

  // load the service's module
  beforeEach(module('chatApp'));

  // instantiate service
  var chatroom;
  beforeEach(inject(function (_chatroom_) {
    chatroom = _chatroom_;
  }));

  it('should do something', function () {
    expect(!!chatroom).toBe(true);
  });

});
