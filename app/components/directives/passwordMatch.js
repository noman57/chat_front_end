'use strict';

angular.module('myApp')
.directive('passwordMatch', function() {
   return {
      require: "ngModel",
      scope: {
        passwordMatch: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordMatch || ctrl.$viewValue) {
               combined = scope.passwordMatch + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordMatch;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordMatch", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordMatch", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});