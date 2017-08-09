'use strict';

var app = angular.module('myApp');

  app.service('ChatService', function () {

    var connected=false;

    var stompClient = null;

  this.connect=function ($username,chatHandler) {
      var socket = new SockJS('http://localhost:8080/chat');
      stompClient = Stomp.over(socket);
      stompClient.connect({company: "1"}, function (frame) {
        connected=true;
          console.log('Connected: ' + frame);
         // stompClient.subscribe('/user/'+$username+'/replay', function (greeting) {
          //stompClient.subscribe('/topic/messages', function (greeting) {
            //  console.log(JSON.parse(greeting.body));
              //chatHandler(greeting.body);
          //});

          stompClient.subscribe('/user/'+$username+'/replay',chatHandler );


      });
  }

  this.disconnect=function () {
      if (stompClient != null) {
          stompClient.disconnect();
      }
      connected=false;
      console.log("Disconnected");
  }

  this.sendMessage=function ($msg) {

      //stompClient.send("/app/chat", {}, JSON.stringify({'name': 'noman'}));

      stompClient.send("/app/chat", {}, JSON.stringify(($msg)));
  }
    
  return this;
  });

  
