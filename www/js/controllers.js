(function (){
  angular.module('starter.controllers', ["ion-gallery"])

  //Controllador del registro de usuarios en firebase
  .controller("AuthCtrl", ["$scope","Auth","$location", function($scope,Auth,$location){
    $scope.user = {};
    
    $scope.registro = function(){
      Auth.login($scope.user)
        //codigo de error
        .catch(function(error){
          var result = error.code;
          $scope.message = error.message;

          if (result === "auth/weak-password"){
            console.log($scope.message);
          }else if(result === "auth/email-already-in-use"){
            console.log($scope.message);
          }else if (result ==="auth/invalid-email"){
            console.log($scope.message);
          }else {
            console.log($scope.message); 
          }
        });
    }

    $scope.loginAuth = function(){
      Auth.loginUser($scope.user)
      //codigo de error
        .catch(function(error){
          var result = error.code;
          $scope.logmsg = error.message;

          if (result === "auth/invalid-email"){
            console.log($scope.logmsg);
          }else if( result === "auth/user-disabled"){
            console.log($scope.logmsg); 
          }else if ( result ==="auth/user-not-found"){
            console.log($scope.logmsg);
          }else if (result ==="auth/wrong-password"){
            console.log($scope.logmsg); 
          }else{
            console.log($scope.logmsg);
          }
        })
      return $location.path("/app/cafe");
    }   
  }])

  //controller de la creacion de un modal
  .controller("newUserCtrl",["$scope","$ionicModal", function($scope, $ionicModal) {
    //modal 1
    $ionicModal.fromTemplateUrl('templates/login.html', {
      id:1,
      scope: $scope
    }).then(function(modal) {
        $scope.modal1 = modal;
      });

    //modal 2
    $ionicModal.fromTemplateUrl("templates/authSesion.html",{
      id: 2,
      scope: $scope
    }).then(function(modal){
      $scope.modal2 = modal;
    });

    //Metodo para abrir los modals
    $scope.seleccion = function(index){
      if(index === 1 ){
        $scope.modal1.show();
      }
      else $scope.modal2.show();
    }

    //Metodo para cerrar los modals
    $scope.cerrar = function(index){
      if(index === 1 ){
        $scope.modal1.hide();
      }
      else $scope.modal2.hide();
    }

  }])

  //controller de la galeria de imagenes
  .controller("gallery", function($scope){
    $scope.items = [
      {
        src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
        sub:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
        sub: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
        sub:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
        sub: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
        sub: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        src:'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
        sub:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }    
    ]
  })
})();