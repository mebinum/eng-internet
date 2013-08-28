'use strict';

var chatApp = angular.module('chatApp',[]);

//chatApp.config(['$routeProvider', function($routeProvider) {
////	$routeProvider.when("/", {
////	  chat: 'ChatMess',
////  });
//}]);
chatApp.service('Chats',['$rootScope','$http',function($rootScope,$http){
	var data = [];
	
	var successCallback = function(data, status, headers, config){
		//console.log('chat was sent ' + JSON.stringify(data));
		config.data.sent = true;
		config.data.timestamp = data.timestamp;
	};
	
	var errorCallback = function(data, status, headers, config){
		console.log('chat failed to send' + data);
		console.log('status message' + status);
		config.data.sent = false;
	};
	
	var addToMessages = function(response) {
		//add the chat data to the array of messages
		//console.log(JSON.stringify(response.config.data));
		data.push(response.config.data);
		
	};
	
	return {
		addChat:function(chat){
			//add post code here
			$http.post('Chat', chat)
				.success(successCallback)
				.error(errorCallback)
				.then(addToMessages);
		},
		data: data,
		getChats: function(){
			 return $http.get('Chat').success(function(chatData) {
				 data = chatData;
	            });
		}
	};
}]);

//Poller Service
chatApp.factory("Poller", ['$timeout','Chats','$rootScope',function ($timeout,Chats,$rootScope) {
    var data = { msgs:[],lastUpdated: new Date(), calls: 0 };
    
    //polling
    var updateTimer = function () {
         console.log('polling here '); 
    	 Chats.getChats().then(function(data){
    		 //console.log(data);
    		 //console.log('chats returned ' + JSON.stringify(data.data));
    		 data.msgs = data.data;
        	 data.lastUpdated = new Date();
             data.calls += 1;
             console.log('updateTimer: ' + data.lastUpdated);
             $rootScope.$broadcast('poll-updated',data);
    	 });
    	 //poll the server every 30 secs
         $timeout(updateTimer, 30000);
    };
    

    return {
        data: data,
        start: function() {
        	updateTimer();
        }
    };
}]);
//-- Services End


//-- Directives Start
//detect when enter is typed
chatApp.directive('onEnter',function(){
	
	var linkFn = function(scope,element,attrs) {
		 element.bind('keypress', function(event) {
	            if(event.which === 13) {
	                scope.$apply(function() {
		                scope.$eval(attrs.onEnter);
	                });
	                event.preventDefault();
	            }
	        });
		};
		return {
			link:linkFn
		};
});

chatApp.directive('redraw',function(Chats){
	
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			scope.$watch('chatMessages',function() {
				//when chatMessages get updated
				//Scroll to bottom if the height of the body is greater than scrollheight
				if (document.body.clientHeight >= document.body.scrollHeight) {
					window.scrollTo(0,document.body.scrollHeight);
				}
			},true);
			
		}
	};
});

//-- Directives End

//-- Filters Start
chatApp.filter('humaneDate',function(){
	return function(input) {
	    return humaneDate(new Date(input));
	  };
});

//-- Controllers Start
chatApp.controller('MainCtrl',['$scope','Chats','Poller', function($scope,Chats,Poller) {
	//check to see if there is a new chat message added
	//$scope.chatMessages = Chats.getChats();
	
	//Start the polling
	Poller.start();
	$scope.$on( 'poll-updated', function (event,data) {
		//console.log('timer data ' + JSON.stringify(data.msgs));
		console.log('poll updated');
		$scope.chatMessages = data.msgs;
	    $scope.lastUpdated = data.lastUpdated;
	    $scope.calls = data.calls;
	  }, true);
}]);

//Chat Form Controller
chatApp.controller('ChatFormCtrl',function($scope,Chats){
	$scope.sendChat = function() {
		if($scope.isChatValid()) {
			return;
		}
		var msg ={};
		angular.copy($scope.chat,msg);
		Chats.addChat(msg);
		$scope.chat = {username:msg.username};
	 };
	  
	  $scope.isChatValid = function() {
		  return $scope.chatForm.$invalid;
	  };
});
