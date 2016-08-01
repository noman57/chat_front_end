'use strict';

/**
 * @ngdoc service
 * @name ufrilWebApp.SecurityService
 * @description
 * # SecurityService
 * Service in the ufrilWebApp.
 */
var app = angular.module('myApp');

  app.service('SecurityService', function (LocalStorage,$http,$cookieStore) {

    var user={};
    return {
      setUser : function(aUser) {
        user= $cookieStore.get('user');
        if(user!==null){
            $cookieStore.put('user',aUser);

            if(aUser=== null || aUser=== undefined) {
              $cookieStore.put('auth','');
            }
        }
        user = aUser;
        LocalStorage.Set('user',aUser);

        console.log(user);
      },
      setUserRemember : function(aUser) {
        $cookieStore.put('user', aUser);
        //saving header into cookie
        $cookieStore.put('auth', LocalStorage.Get('auth'));
        user = aUser;
        console.log('setting value');

      },
      isLoggedIn : function() {

        user=LocalStorage.Get('user');
        $http.defaults.headers.common.Authorization=LocalStorage.Get('auth');
        if(user===null ||user===''){
          user= $cookieStore.get('user');
          $http.defaults.headers.common.Authorization=$cookieStore.get('auth');
        }
        //console.log(user);
        return (user) ? user : false;
      }
    };

  });

  /*app.factory("Access", function($q, SecurityService) {
    //var user = {};
    var Access = {
      OK: 200,
      UNAUTHORIZED: 401,
      FORBIDDEN: 403,

      isAnonymous: function() {
        var deferred = $q.defer();
        console.log('testing');
        console.log(SecurityService.isLoggedIn());
        if(!SecurityService.isLoggedIn() ) {
          deferred.resolve(Access.OK);
        } else {
          deferred.reject(Access.FORBIDDEN);
        }
        return deferred.promise;
      }
    };

    return Access;
  });*/
