'use strict';

/**
 * @ngdoc service
 * @name ufrilWebApp.LocalStorage
 * @description
 * # LocalStorage
 * Service in the ufrilWebApp.
 */
angular.module('myApp')
  .factory('LocalStorage', function ($window) {

    /**
     *  store a key value pair in local storage
     * @param key
     * @param value
     */
    this.Set = function (key, value) {
      if (angular.isArray(value) || angular.isObject(value)) {
        value = JSON.stringify(value);
      }

      $window.localStorage[key] = value;
    };

    /**
     *  Return value from local storage
     * @param key
     * @returns {null}
     * @constructor
     */

    this.Get = function (key) {
      this.setUp();
      var value = $window.localStorage[key];

     // if (angular.isArray(value) || angular.isObject(value))
      try {
        value = JSON.parse($window.localStorage[key]);
      }
      catch(err) {
       //console.log(err);
      }


      return value;
    };

  this.setUp = function (){
      var hours = 24; // Reset when storage is more than 24hours
      var now = new Date().getTime();
      var setupTime = localStorage.getItem('setupTime');
      if (setupTime === null) {
        localStorage.setItem('setupTime', now);
      } else {
        if(now-setupTime > hours*60*60*1000) {
          localStorage.clear();
          localStorage.setItem('setupTime', now);
        }
     }
    };
    return this;

  });
