// HomeController.js
// For distribution, all controllers
// are concatanated into single app.js file
// by using Gulp

'use strict';

angular.module('myApp')

// Routing configuration for this module
/*.config(['$routeProvider',function($routeprovider){
	$routeprovider.when('/login', {
		controller: 'LoginController',
		templateUrl: 'components/views/loginView.html'
	});
}])
*/
// Controller definition for this module
.controller('LoginCtrl', function($scope, $state, UserService, SecurityService) {
   
    $scope.user = {};
	/**
   * Method called to to Login
   * @returns {*}
   */
    $scope.login = function () {
      console.log("login");
      $scope.dataLoading = true;
      var user = $scope.user;

      UserService.signIn(user.username, user.password).then(
        function successCallback(response) {
          $scope.dataLoading = false;
          if($scope.user.remember) {
            SecurityService.setUserRemember(response.data.data);
          } else {
            SecurityService.setUser(response.data.data);
          }
          $state.go('landing', {role: 'consumer'});
        },
        function errorCallback(response) {
          console.log("login error");
          $scope.dataLoading = false;
          $scope.errorDiv = true;
          console.log(response);
           if (response.status  == 401) {
            $scope.error = "There was an error with your E-Mail/Password combination. Please try again";
          }else  if (response.data != null) {
            $scope.error = response.data.error;
          }
        });
    };

	
});