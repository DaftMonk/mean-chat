'use strict';

describe('Directive: historyBack', function () {

  // load the directive's module
  beforeEach(module('chatApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<history-back></history-back>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the historyBack directive');
  }));
});
