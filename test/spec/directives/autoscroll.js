'use strict';

describe('Directive: autoScroll', function () {

  // load the directive's module
  beforeEach(module('chatApp'));

  var el, $compile, $rootScope, scope, placeholder;

  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();

    el = angular.element('<div auto-scroll="event:message" style="height: 500px; overflow: auto;"></div>');
    placeholder = angular.element('<div style="height: 1000px;"></div>');
    el.append(placeholder);
    $('body').append(el);
    $compile(el)(scope);
  }));

  it('should scroll to position on event', function () {
    expect(el.scrollTop()).toEqual(0);
    $rootScope.$broadcast('event:message');
    expect(el.scrollTop()).toEqual(500);
  });
});

