'use strict';

angular.module('chatApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, mySocket) {
    $scope.logout = function() {
      Auth.logout()
        .then(function() {
          // Reconnect to socket as guest
          mySocket.reconnect();

          $location.path('/login');
        });
    };

    $scope.Auth = Auth;
  });