(function (){

  angular.module("starter.services", ["firebase"])

  //Servicio de base de datos
  .factory("database",["firebase","$firebaseObject", function($firebase,$firebaseObject){
    
    var productos = [];
    var boton = productos;
    var db = firebase.database();

    //Filtrado de Id
    var productoFiltro = function(Id){
        for(var i = 0 ; i < productos.length ; i++){
          if (productos[i].p.Id == Id){
            return productos[i];
          }
        };
        return null
      }    

    var service = {

      dataRef : function(data1,data2){
        var ref = db.ref()
        var refObj = $firebaseObject(ref.child(data1).child(data2)); 
        return refObj;
      },

      addProduct : function(p){
        var productoFiltrado = productoFiltro(p.Id); //Llamamos a la funcion para filtrar el Id

        if (!productoFiltrado){
          productos.push({
          
            p, 
            Cantidad : 1

          })                    
        }else{
          productoFiltrado.Cantidad++
        }
      },

      showProduct : function(){
        return productos;
      },

      deleteItem : function(item){
        productos.splice(productos.indexOf(item),1);
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