(function (){

  angular.module("starter.services", ["firebase"])

  //Servicio de base de datos
  .factory("database",["firebase","$firebaseObject","$q", function($firebase,$firebaseObject,$q){

    var db = firebase.database();

    var service = {

      dataRef : function(data1,data2){
        var ref = db.ref()
        var refObj = $firebaseObject(ref.child(data1).child(data2)); 
        return refObj;
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

      listener: function(user){
        return auth.onAuthStateChanged(user);
      },
      
      mailVerification : function(){
        return auth.currentUser.sendEmailVerification()
      },

      cerrarSesion : function(){
        return auth.signOut();
      },
    	user:{}
    }
    return service;
  }])
})();