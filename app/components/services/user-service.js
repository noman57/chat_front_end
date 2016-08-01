'use strict';

/**
 * @ngdoc service
 * @name ufrilWebApp.UserService
 * @description
 * # UserService
 * Service in the myAPp.
 */
angular.module('myApp')
  .service('UserService', function ($http, ENV, Base64, LocalStorage) {

    /**
     * check local storage has any cache user
     * @returns {boolean}
     */
    this.checkLocalAuth = function () {

      if (LocalStorage.Get('auth') !== null) {
        $http.defaults.headers.common.Authorization = LocalStorage.Get('auth');
        return true;
      }
      else {
        return false;
      }
    };

    /**
     * Use to Authenticate and Authorize a user
     * @param $userId
     * @param $password
     * @returns {*}
     */
    this.signIn = function ($userId, $password) {
      console.log("Sign In");
      var endpoint = "users/" + $userId;

      $http.defaults.headers.common.Authorization = 'Basic ' + Base64.encode($userId + ':' + $password);
      LocalStorage.Set('auth', 'Basic ' + Base64.encode($userId + ':' + $password));
      // LocalStorage.Get('auth');
      console.log(ENV.apiEndpoint);
      return $http({
        method: 'get',
        url: ENV.apiEndpoint + endpoint
      });
    };

    this.reloadProfile= function($username){
      var endpoint = "users/" + $username;
      return $http({
        method: 'get',
        url: ENV.apiEndpoint + endpoint
      });
    };


    /**
     * Create a new user account. The registered user will be a consumer by default.
     * @param $data
     * @returns {*}
     */
    this.signUp = function ($data) {
      var endpoint = "users";

      return $http({
        method: 'post',
        url: ENV.apiEndpoint + endpoint,
        data: $data
      });
    };

    /**
     * An email will be sent to the user's provided email which contains a sign-up confirmation token. Use that token to
     * confirm the user account.
     * @param $data
     * @returns {*}
     */
    this.confirmSignUp = function ($data) {
      var endpoint = "users/confirm-signup";

      return $http({
        method: 'post',
        url: ENV.apiEndpoint + endpoint,
        data: $data
      });
    };

    /**
     * If for any reason the user doesn't get the sign-up confirmation email.
     * The user can send a resend sign-up token
     * request.
     * @param $data
     * @returns {*}
     */
    this.resendSignUpToken = function ($data) {
      var endpoint = "users/resend-signup-token";

      return $http({
        method: 'post',
        url: ENV.apiEndpoint + endpoint,
        data: $data
      });
    };

    /**
     * A user can send a reset password request with this service.
     * An email will be sent to his inbox with password reset token
     * @param $data
     * @returns {*}
     */
    this.resetPassword = function ($data) {
      var endpoint = "users/reset-password";

      var data = { userId: $data };

      return $http({
        method: 'post',
        url: ENV.apiEndpoint + endpoint,
        data: data
      });
    };

    /**
     * Using the password reset token the user can change his password using this service.
     * @param $data
     * @returns {*}
     */
    this.changePassword = function ($data) {
      var endpoint = "users/change-password";

      return $http({
        method: 'post',
        url: ENV.apiEndpoint + endpoint,
        data: $data
      });
    };

    /**
     * The user can get his profile information using this service.
     * @param $userId
     * @returns {*}
     */
    this.getUserProfile = function ($userId) {
      var endpoint = "users/" + $userId;

      return $http({
        method: 'get',
        url: ENV.apiEndpoint + endpoint
      });
    };

    /**
     * The user can update his profile information using ths service.
     * @param $username
     * @returns {*}
     */
    this.updateUserProfile = function ($username, $data) {
      var endpoint = "users/" + $username;

      return $http({
        method: 'put',
        url: ENV.apiEndpoint + endpoint,
        data: $data
      });
    };



    this.getCredit = function ($username) {
      var endpoint = "users/" + $username+"/credit-points ";

      return $http({
        method: 'GET',
        url: ENV.apiEndpoint + endpoint
      });
    };

  });
