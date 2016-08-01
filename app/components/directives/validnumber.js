'use strict';

/**
 * @ngdoc directive
 * @name ufrilWebApp.directive:validNumber
 * @description
 * # validNumber
 */
angular.module('ufrilWebApp')
  .directive('validNumber', function() {
    return {
      require: '?ngModel',
      link: function(scope, element, attrs, ngModelCtrl) {
        if(!ngModelCtrl) {
          return;
        }

        ngModelCtrl.$parsers.push(function(val) {
          if (angular.isUndefined(val)) {
            var val = '';
          }
          var clean = val.replace( /[^0-9\.]/g, '');
          if (val !== clean) {
            ngModelCtrl.$setViewValue(clean);
            ngModelCtrl.$render();
          }
          return clean;
        });

        element.bind('keypress', function(event) {
          if(event.keyCode === 32) {
            event.preventDefault();
          }
        });
      }
    };
  });
