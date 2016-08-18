(function (){

    angular.module("starter.states", [])

    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/principal.html',
        controller:"newUserCtrl"
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

        .state("app.iniciosesion",{
          url:"/login",
          views:{
            "menuContent":{
              templateUrl:"templates/iniciosesion.html"
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
        $urlRouterProvider.otherwise('/app/login');
      });
})();