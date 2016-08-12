angular.module('starter', ['ionic', 'starter.controllers'])

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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/principal.html',
    controller: 'AppCtrl'
  })

  .state('app.cafe', {
    url: '/cafe',
    views: {
      'menuContent': {
        templateUrl: 'templates/cafe.html'
      }
    }
  })

  .state('app.promociones', {
      url: '/promociones',
      views: {
        'menuContent': {
          templateUrl: 'templates/promociones.html'
        }
      }
    })  

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
        }
      }
    })

  .state("app.comida",{
    url:"/comida",
    views:{
      "menuContent":{
        templateUrl:"templates/comida.html"
      }
    }
  })

  .state("app.frios",{
    url:"/frios",
    views:{
      "menuContent":{
        templateUrl:"templates/frios.html"
      }
    }
  })

  .state("app.about",{
    url:"/about",
    views:{
      "menuContent":{
        templateUrl:"templates/about.html"
      }
    }
  })

  .state("app.postres",{
    url:"/postres",
    views:{
      "menuContent":{
        templateUrl:"templates/postres.html"
      }
    }
  })        

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
