'use strict';

/**
 * Directive that scrolls down an element to the bottom
 * upon an event
 */
angular.module('chatApp')
  .directive('autoScroll', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var event = attrs.autoScroll;
        scope.$on(event, function() {
          var firstChild = element.children().eq(0);
          element.scrollTop(firstChild.height());
        });
      }
    };
  });
