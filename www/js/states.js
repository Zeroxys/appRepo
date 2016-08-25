(function (){

    angular.module("starter.states", [])

    .config(function($stateProvider, $urlRouterProvider) {
     
      $stateProvider
        .state("login",{
          url:"/login",
          templateUrl:"templates/iniciosesion.html",
          controller: "newUserCtrl"
        })       

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/principal.html'
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
        });
        // Si ningun state coincide usa este
        $urlRouterProvider.otherwise('/login');
      
      });
})();