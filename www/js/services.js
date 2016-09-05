(function (){

  angular.module("starter.services", ["firebase"])

  //Servicio de base de datos
  .factory("database",["firebase","$firebaseObject", function($firebase,$firebaseObject){
    var ref = firebase.database().ref();
    var obj = $firebaseObject(ref);
    
    var service = {
      db : function(){
        var data = obj.$loaded().then(function(){
            console.log("Abriendo el objeto:", obj);
          });
        return data;
      }
    }

    return service;

  }])

  //Servicio de Autenticacion
  .factory("Auth",["$firebaseAuth","firebase", function($firebaseAuth,$firebase){
   var auth = $firebase.auth()

    var service = {
    	
      registerUser: function(user){
    		return auth.createUserWithEmailAndPassword(user.email,user.password)
      },

      loginUser: function(user){
        return auth.signInWithEmailAndPassword(user.email,user.password)
      },

      userReset: function(mail){
        return auth.sendPasswordResetEmail(mail.correo)
      },
    	user:{}
    }
    return service;
  }])
})();