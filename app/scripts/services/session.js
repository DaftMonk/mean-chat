'use strict';

angular.module('chatApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
