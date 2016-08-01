'use strict';

// Defining Angular app model with all other dependent modules
var myAPP = angular.module('myApp',[
	  'ngRoute',
    'ngCookies',
    'config',
	  'ui.router',
    'mgcrea.ngStrap']);

myAPP.config(function($routeProvider,$urlRouterProvider, $stateProvider, $locationProvider, $httpProvider) {
	
	  $httpProvider.defaults.useXDomain = true;
  

  		$urlRouterProvider.otherwise('/');

	 $stateProvider
    .state('login', {
      url: '/login',      
      params: {requireLogin: false},
      views: {
        '': {templateUrl: 'components/views/templates/login.tpl.html', controller: "LoginCtrl"},
        'header@login': {templateUrl: 'components/views/templates/header.tpl.html'},
        'body@login': {templateUrl: 'components/views/auth/login.html'},
        'footer@login': {templateUrl: 'components/views/templates/footer.tpl.html'}
      }
    })


    .state('signup', {
      url: '/signup',      
      params: {requireLogin: false},
      views: {
        '': {templateUrl: 'components/views/templates/login.tpl.html', controller: "SignupCtrl"},
        'header@signup': {templateUrl: 'components/views/templates/header.tpl.html'},
        'body@signup': {templateUrl: 'components/views/auth/signup.html'},
        'footer@signup': {templateUrl: 'components/views/templates/footer.tpl.html'}
      }
    })
     
    .state('signupSuccess', {
      url: '/signup-success/:userId',
      params: {requireLogin: false},
      views: {
        '': {templateUrl: 'components/views/templates/login.tpl.html', controller: "SignupCtrl"},
        'header@signupSuccess': {templateUrl: 'components/views/templates/header.tpl.html'},
        'body@signupSuccess': {templateUrl: 'components/views/auth/signup-success.html'},
        'footer@signupSuccess': {templateUrl: 'components/views/templates/footer.tpl.html'}
      }
    })
    
   
    
    .state('landing', {
      url: '/',
      data: {requireLogin: false},
      params : {role: null},
      views: {
        '': {templateUrl: 'components/views/templates/main.tpl.html'},
        'header@landing': {templateUrl: 'components/views/templates/header.tpl.html'},
        'body@landing': {templateUrl: 'components/views/homeView.html'},
        'footer@landing': {templateUrl: 'components/views/templates/footer.tpl.html'}
      }
    })

  
    ;

	
});



myAPP.run(function ($rootScope, $state, SecurityService,$stateParams) {

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
    var shouldLogin = toState.data !== undefined && toState.data.requireLogin && !SecurityService.isLoggedIn();
    console.log(SecurityService.isLoggedIn());
    console.log(toParams);
    $rootScope.$stateParams = $stateParams;
    var landing='landing';
    var login = 'login';
    console.log('Going back to landing');
    if ( toState.data !== undefined && shouldLogin) {
      consloe.log('Going back to landing');
      $state.go(toState.data.redirectTo, toParams);
      event.preventDefault();
      return;
    }

    // we can user redirect here
    if (shouldLogin) {
      console.log("shouldLogin");
      $state.go(login);
      event.preventDefault();
      return;
    }
    // for handeling the back button
    if (SecurityService.isLoggedIn() && toState.data === undefined ) {
      event.preventDefault();
      //this handels if user is logged in and gives an specific url which require login
      if(  fromState.data === undefined ){
          $state.go(landing);
      }
      return;
    }
  });
});
