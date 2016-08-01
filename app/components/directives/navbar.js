'use strict';

/**
 * @ngdoc directive
 * @name ufrilWebApp.directive:uflNavbar
 * @description
 * # uflNavbar
 */
angular.module('myApp')
  .directive('uflNavbar', function () {
    return {
      templateUrl: 'components/views/directives/navbar.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.mySlides, function(value) {
          setTimeout(function() {

            $(".dropdown").hover(
              function() {
                $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideDown("fast");
                $(this).toggleClass('open');
              },
              function() {
                $('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).slideUp("fast");
                $(this).toggleClass('open');
              }
            );

          }, 1);
        });
      }
    };
  });
