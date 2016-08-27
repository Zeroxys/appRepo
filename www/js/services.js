(function (){
  angular.module("starter.services", ["firebase"])

  //Servicio de Autenticacion
  .factory("Auth",["$firebaseAuth","firebase", function($firebaseAuth,$firebase){
   var auth = $firebase.auth()

    var service = {
    	
      login: function(user){
    		return auth.createUserWithEmailAndPassword(user.email,user.password)
      },

      loginUser: function(user){
        return auth.signInWithEmailAndPassword(user.email,user.password)
      },
    	user:{}
    }
    return service;
  }])
})();