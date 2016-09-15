(function (){

  angular.module("starter.services", ["firebase"])

  //Servicio de base de datos
  .factory("database",["firebase","$firebaseObject", function($firebase,$firebaseObject){
    
    var productos = [];
    var boton = productos;
    var db = firebase.database();

    var service = {

      dataRef : function(data1,data2){
        var ref = db.ref()
        var refObj = $firebaseObject(ref.child(data1).child(data2)); 
        return refObj;
      },

      addProduct: function(p){
          var idAdd = p.Id;
          var tamanyo =  productos.length;

          for(i = 0 ; i < tamanyo; i++){
            if (tamanyo === 0){
              productos.push({p});
            }else{
              if(idAdd != productos.Id)
              {
                  productos.push({p});
              }
              else
              {
                  productos.Cantidad++;
              }
            }
          console.log(tamanyo);
          }
          return productos;          
      },

      showProduct : function(){
        return productos;
      },

      actionButton:function(){
        x = false;
        if(productos.length > 0){
          x = true;
        }
        return x;
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