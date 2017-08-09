'use strict';

/**
 * @ngdoc function
 * @name Myapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MainCtrl', function ($scope, $state,$stateParams, $window, SecurityService, UserService,LocalStorage,$stomp,ChatService) {

    $scope.user = {};
    $scope.sub = {};
    $scope.chat={};

    $scope.msg = {};

     $scope.conversation=[];


    $scope.profile = SecurityService.isLoggedIn();
    console.log("profile");
    console.log($scope.profile);

    $scope.date=Date();
    function  chatHandler(data){

      data= JSON.parse(data.body);

      console.log("got msg "+data.type);


      if(data.type =="CONNECT"){
            console.log("Working great");
          var flag=confirm("Accept chat request");
          if(flag){
            $scope.acceptChatRequest(data);

          }
      }else if(data.type =="ACCEPT"){
        console.log(data);
        $scope.chat.with=data.from;


      }else if(data.type =="MESSAGE"){

         $scope.conversation.push(data);
         console.log("got chat messga")

      }else if(data.type =="WARNING"){
        alert(data.text);

      }
      $scope.$apply();

    }


    $scope.acceptChatRequest = function (data) {
      console.log("Sending messages");
      $scope.msg.type="ACCEPT";
      $scope.msg.from=$scope.profile.username;
      $scope.msg.to=data.from;
      ChatService.sendMessage($scope.msg);
      $scope.chat.with=data.from;
      
    };

    ChatService.connect($scope.profile.username,chatHandler);

    
    $scope.logout = function () {
      SecurityService.setUser('');
      LocalStorage.Set('auth', '');
      LocalStorage.Set('user', '');
      console.log('success');
      $state.go('login', null, {reload: true});
    };

    $scope.refresh = function () {
      console.log("Refresh");
     $window.location.reload();
    };


    $scope.sendMessage = function () {
      var chatUnit={};
      console.log("Sending messages");
      chatUnit.type="MESSAGE";
      chatUnit.text=$scope.msg.text;
      chatUnit.from=$scope.profile.username;
      chatUnit.type="MESSAGE";;
      chatUnit.to=$scope.msg.to;
      ChatService.sendMessage(chatUnit);
      

      $scope.conversation.push(chatUnit);
      $scope.msg.text=null;

      console.log($scope.conversation);
      
    };


    $scope.startChat = function () {
      console.log("Sending messages");
      $scope.msg.type="CONNECT";
      $scope.msg.from=$scope.profile.username;
      ChatService.sendMessage($scope.msg);
      
    };


   $scope.redirectlogin = function () {
     
      console.log('success');
      $state.go('login', null, {reload: true});
    };


  });
