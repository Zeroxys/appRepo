(function (){
	angular.module('starter', ['ionic', 'starter.controllers',"starter.states","starter.services"])

	.run(function($ionicPlatform) {
	  $ionicPlatform.ready(function() {
	    if (window.cordova && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	      cordova.plugins.Keyboard.disableScroll(true);

	    }
	    if (window.StatusBar) {
	      StatusBar.styleDefault();
	    }
	  });
	})
})();