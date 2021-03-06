const Swal = require('sweetalert2');

var config = {
  apiKey: "AIzaSyBYJJPXZGJYJgNdZIaIAXZZ0DE-3DsfSYw",
  authDomain: "inmobiliariasmx.firebaseapp.com",
  databaseURL: "https://inmobiliariasmx.firebaseio.com",
  projectId: "inmobiliariasmx",
  storageBucket: "inmobiliariasmx.appspot.com",
  messagingSenderId: "374273595319"
};
firebase.initializeApp(config);

(function(){
  'use strict';
  //Variables Globales
  document.addEventListener('DOMContentLoaded', function(){

    //Verificar si el usario tiene una sesion activa
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        location.href = "pantalla_principal.html";
      } else {
        let form = document.getElementsByClassName("form-inicio-sesion");
        form[0].style.display = "block";
      }
    });

    //Campos
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    //Boton
    let btnIngresar = document.getElementById("ingresar");

    btnIngresar.addEventListener("click", function(){
      if(email.value.trim() === "" || password.value.trim() ==="") {
        Swal('Error','Por favor llene todos los campos','warning');
      } else {
        firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function(){
          location.href = "pantalla_principal.html";
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            Swal('Error','Contraseña Incorrecta','error');
          } else if(errorCode === 'auth/network-request-failed') {
            Swal('Error','Verifique su conexión a Internet','error');
          } else if(errorCode === 'auth/user-not-found') {
            Swal('Error','Verifique que el email sea correcto','error');
          } else if(errorCode === 'auth/invalid-email') {
            Swal('Error','Ingrese un correo valido','error');
          } else {
            console.log(errorCode);
            console.log(errorMessage);
            console.log(error);
          }
        });
      }

    });

  });

})();
