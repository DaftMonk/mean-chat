'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('chatApp'));

  var MainCtrl,
    scope;

  beforeEach(inject(function($controller, $rootScope){
    //create an empty scope
    scope = $rootScope.$new();

    //declare the controller and inject our mock
    MainCtrl = $controller('MainCtrl', {$scope: scope});
  }));

});
