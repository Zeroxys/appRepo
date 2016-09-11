(function (){
  angular.module('starter.controllers', ["ion-gallery"])

  //Controlador de datos
  .controller("DataCtrl", ["database","$scope", function(database,$scope){
   
   var route = "data";
   var cafe = "cafe";
   var frios = "frios";
   var comidas = "comidas";
   var postres =  "postres"

    $scope.cafeData =  database.dataRef(route,cafe);
    $scope.frioData = database.dataRef(route,frios);
    $scope.comidasData = database.dataRef(route,comidas);
    $scope.postresData = database.dataRef(route,postres);
    console.log($scope.cafeData)

  }])

  //Controllador del registro de usuarios en firebase
  .controller("AuthCtrl", ["$scope","Auth","$location","$ionicPopup","$timeout", function($scope,Auth,$location,$ionicPopup,$timeout){
    $scope.user = {};
    $scope.mail = {};
    
    //Metodo de registro de usuarios
    $scope.registro = function(){
      Auth.registerUser($scope.user)
        
        //Usuario registrado con exito
        .then(function(result){
          Auth.mailVerification();
          $scope.msgSuccess = $ionicPopup.alert({
            title:"Registro exitoso" ,
            template:"Usuario registrado con exito",
          })
        })

        //codigo de error
        .catch(function(error){
          var message = error.code;
          console.log(message);
          if (message === "auth/email-already-in-use"){
            message = "Este correo ya esta siendo utilizado";
            console.log(message);
          }else if (message === "auth/invalid-email"){
            message = "Direccion de correo invalida";
          }else if(message === "auth/operation-not-allowed"){
            message ="El usuario ha sido desactivado";
          }else if (message ==="auth/weak-password"){
            message = "La contraseña debe contener 6 caracteres";
          }else{
            message = "Error interno, consulte al desarrollador";
          }
          var msgError = $ionicPopup.alert({
            title:"Error",
            template: message
          })
            .then(function(res){
              console.log(message);
            });
        })
    }

    //Metodo de logueo de usuarios
    $scope.loginAuth = function(){
      Auth.loginUser($scope.user)

      //Usuario registrado con exito
      .then(function (authUser){
        $scope.msgSuccess = $ionicPopup.alert({
          title:"Bienvenido :)",
          template:"Usuario autenticado con exito",
        });        
        Auth.listener(function(firebaseUser){
          console.log(firebaseUser.email)
        })
        $location.path("app/cafe");
      })

      //codigo de error
      .catch(function(error){
        var message = error.code;

        if (message === "auth/invalid-email"){
          message = "Direccion de correo no es valida";
        }else if(message === "auth/user-disabled"){
          message = "Cuenta desactivada";
        }else if(message === "auth/user-not-found"){
          message = "Usuario no encontrado";
        }else if (message === "auth/wrong-password"){
          message = "Vuelve a introducir tu contraseña";
        }else{
          message = "Error interno, consulta al desarrollador :(";
        }
        $scope.msgSuccess = $ionicPopup.alert({
          title:"Error",
          template:message,
        });        
      })
    }

    //Metodo restablecimiento contraseña
    $scope.passReset = function(){
      Auth.userReset($scope.mail)
      
      .then(function(result){
        $scope.msgSuccess = $ionicPopup.alert({
          title:"Enviado",
          template:"Revisa tu bandeja de entrada" 
        })
      })

      .catch(function(error){
        var message = error.code;
        if (message === "auth/invalid-email"){
          message = "El correo es invalido"; 
        }else if(message === "auth/user-not-found"){
          message = "El correo no fue encontrado";
        }
        $scope.msgSuccess = $ionicPopup.alert({
          title:"Error",
          template:message,
        });        
      })        
    }


  //Metodo para cerrar la sesion activa
  $scope.cerrarSesion = function(firebaseUser){
    Auth.cerrarSesion()
    .then(function(){
      $location.path("/login");
      console.log("El usuario ha cerrado sesion");
    });
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

    //modal 3
    $ionicModal.fromTemplateUrl("templates/restablecer.html",{
      id:3,
      scope:$scope
    }).then(function(modal){
      $scope.modal3 = modal;
    })

    //Metodo para abrir los modals
    $scope.seleccion = function(index){
      if(index === 1 ){
        $scope.modal1.show();
      }else if(index === 2){
        $scope.modal2.show();
      } else{
        $scope.modal3.show();
      }
    }

    //Metodo para cerrar los modals
    $scope.cerrar = function(index){
      if(index === 1 ){
        $scope.modal1.hide();
      }else if(index === 2){
        $scope.modal2.hide();
      }else{
        $scope.modal3.hide();
      }
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