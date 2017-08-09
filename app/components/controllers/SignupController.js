'use strict';

/**
 * @ngdoc function
 * @name myApp .controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('SignupCtrl', function ($scope, $state, $stateParams, UserService) {

    $scope.user = {};
    $scope.gender = [
        {value: 'MALE', name: 'MALE'},
        {value: 'FEMALE', name: 'FEMALE'}
      ];

    $scope.signup = function () {
      console.log("signup");
      $scope.dataLoading = true;
      var user = $scope.user;
      console.log(user);
      UserService.signUp(user).then(
        function successCallback(response) {
          $scope.dataLoading = false;
          console.log(response);
          $state.go("signupSuccess", {userId: user.username, msg: response.data.data.message});
        },
        function errorCallback(response) {
          $scope.dataLoading = false;
          $scope.errorDiv = true;
          $scope.error = response.data.message;
          console.log('failed  test' + response.statusText);
          console.log('Detail ' + response.data.error.detail);
          console.log(response);
        }
      );
    };


    

 

  });
