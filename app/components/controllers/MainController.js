'use strict';

/**
 * @ngdoc function
 * @name ufrilWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ufrilWebApp
 */
angular.module('myApp')
  .controller('MainCtrl', function ($scope, $state,$stateParams,  SecurityService, UserService,LocalStorage) {

    $scope.user = {};
    $scope.sub = {};
    $scope.profile = SecurityService.isLoggedIn();
    console.log("profile");
    console.log($scope.profile);


    $scope.logout = function () {
      SecurityService.setUser('');
      LocalStorage.Set('auth', '');
      LocalStorage.Set('user', '');
      console.log('success');
      $state.go('login', null, {reload: true});
    };


   $scope.redirectlogin = function () {
     
      console.log('success');
      $state.go('login', null, {reload: true});
    };


  });
