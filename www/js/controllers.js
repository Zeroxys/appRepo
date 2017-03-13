(function (){
  angular.module('starter.controllers', ["ion-gallery"])

  //Controllador de pagos
  .controller("pagosCtrl", ["$scope","$state","$ionicPopup","$http","chargesUrl", function($scope,$state,$ionicPopup,$http,chargesUrl){
    
    //Deteccion de fraudes
    var deviceSessionId = OpenPay.deviceData.setup("payment-form", "deviceIdHiddenFieldName");
    console.log("Este es el id del dispositivo :" + deviceSessionId)
    var url = chargesUrl.url

    $scope.comprarClick = function(){
      $state.go("app.comprar")
    }

      //Al dar click en el buton submit, realiza el "tokenize de la tarjeta"
      //Creacion del token
      $('#pay-button').on('click', function(event) {
        event.preventDefault();
        $("#pay-button").prop( "disabled", true);
        OpenPay.token.extractFormAndCreate('payment-form', success_callback, error_callback);
      });

      //callback de exito y realizacion de cargos
      var success_callback = function(response){
        var token_id = response.data.id;
        $("#token_id").val(token_id);
        $("#deviceIdHiddenFieldName").val(deviceSessionId);
        //console.log("Operacion exitosa, se genero el token " +  token_id);
        //console.log("Se genero el siguiente token : " + token_id);
        var data ={
            source_id : token_id,
            method:'card',
            amount : $scope.frm.amount,
            description : $scope.frm.description,
            device_session_id : deviceSessionId,
            customer:{
              name: $scope.frm.name,
              last_name: $scope.frm.last_name,
              phone_number: $scope.frm.phone_number,
              email : $scope.frm.email,
              order_id : "oid-00721"
            }
          }        
        $('#payment-form').submit("asdsad");

        $http.post(url,data).
          success(function(data, status) {
            if (status === 200){
              var alertPop = $ionicPopup.alert({
                title:"Success",
                template:"El pago ha sido recibido con exito"
              })
              $state.go("app.cafe")
              console.log("La informacion ha sido enviada correctamente al server "+ status)
              console.log(data)            
            }
          }).error(function(error){
            var alertPop = $ionicPopup.alert({
              title:"Error",
              template:"Ha ocurrido el siguiente error: " + error
            })
              console.log("Ocurrio un error al mandar la peticion al server" + error);
          });

          console.log(localStorage.setItem("data",data))        
      };

      //calback de error
      var error_callback = function(response){
          var alertPop = $ionicPopup.alert({
            title:"Error",
            template:"Los siguientes campos son requeridos " + response.data.description
          })
        console.log(response.data)
        $("#pay-button").prop("disabled",false);
      };

  }])

  //Controlador de datos
  .controller("DataCtrl", ["database","$scope","$ionicPopup", function(database,$scope,$ionicPopup){

   var route = "data";
   var cafe = "cafe";
   var frios = "frios";
   var comidas = "comidas";
   var postres =  "postres"

    $scope.cafeData =  database.dataRef(route,cafe);
    $scope.frioData = database.dataRef(route,frios);
    $scope.comidasData = database.dataRef(route,comidas);
    $scope.postresData = database.dataRef(route,postres);

    $scope.showShopping  =  database.showProduct();

    $scope.filtrarCantidad = function(){
      console.log(cantidad);
    }

    $scope.addProducto = function(p){
      database.addProduct(p);
    }

    $scope.showButton = function(){
      button = database.actionButton();
      return button;
    }

    $scope.deleteProduct = function(item){
      database.deleteItem(item);
    }

    //Scope de la introduccion de cantidades
    $scope.totalProduct = function(p){
      var total = database.total(p)
      if (total){

        return total;
      }else{
        return total;
      }
    }

    $scope.mostrarTotal = function(cantidad,total){
      var regExp = /^\d*$/;
      var totalProducto = cantidad * total;
      if (isNaN(totalProducto)){
        totalProducto = 0;
        return totalProducto;
      }else if(regExp.test(totalProducto)){
        return totalProducto;
      }

    }

    $scope.badge = function(){
      return database.badgeNum();
    }

  }])

  //Controllador del registro de usuarios en firebase
  .controller("AuthCtrl", ["$scope","Auth","$location","$ionicPopup","$timeout","$ionicModal", function($scope,Auth,$location,$ionicPopup,$timeout,$ionicModal){
    /*$scope.user = {};
    $scope.mail = {};*/

    //Metodo de logueo facebook;
    $scope.facebookLogin = function(){

        var user = firebase.auth().currentUser;

          if (!user){
            var provider = new firebase.auth.FacebookAuthProvider()
            provider.addScope("public_profile")
            firebase.auth().signInWithPopup(provider)
              .then(function (result) {

                   var user = result.user
                   var name = user.displayName
                   var picture =  user.photoURL

                console.log(name,picture);          
              })
              .catch(function (err) {
                console.log(err.code);
              })
          }else{
            $location.path("app/cafe");
          }


    }


  //Metodo para cerrar la sesion activa
  $scope.cerrarSesion = function(){
    Auth.cerrarSesion()
      .then(function(){
        $location.path("/login");
        console.log("El usuario ha cerrado sesion");
      })
      .catch(function (err){
        console.log("Ha ocurrido el siguiente error : " + err);
      });
  }

    //Metodo de registro de usuarios
    $scope.registro = function(user){

      if (!user.email || !user.password){
          $scope.msgSuccess = $ionicPopup.alert({
            title : "Error",
            template : "Asegurese de haber rellenado correctamente los campos"
          })
      }else{

          Auth.registerUser(user)
          //Usuario registrado con exito
          .then(function(result){

            user.email ="";
            user.password ="";

            Auth.mailVerification();
            $scope.msgSuccess = $ionicPopup.alert({
              title:"Registro exitoso" ,
              template:"Usuario registrado con exito",
            })
            $scope.modal1.hide();
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
    }

    //Metodo de logueo de usuarios
    $scope.loginAuth = function(user){

      if (!user.email || !user.password){

        $scope.mensaje = $ionicPopup.alert({
          title : "Error",
          template : "Asegurese de haber rellenado correctamente los campos"
        })

      }else
      {
        //Usuario registrado con exito
        Auth.loginUser(user)

        .then(function (authUser){
          user.email ="";
          user.password ="";

          $scope.msgSuccess = $ionicPopup.alert(
          {
            title:"Bienvenido",
            template:"Usuario autenticado con exito",
          }
          );

          Auth.listener(function(firebaseUser){
            if (firebaseUser){
              $location.path("app/cafe");
              $scope.modal2.hide();
            }
          })
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
    }

    //Metodo restablecimiento contraseña
    $scope.passReset = function(){
      Auth.userReset($scope.mail)

      .then(function(result){
        $scope.msgSuccess = $ionicPopup.alert({
          title:"Enviado",
          template:"Te hemos enviado un correo electronico para restablecer tu contraseña"
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
    })
    .then(function(modal) {
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
