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

(function () {
  'use strict';
  //Variables Globales
  document.addEventListener('DOMContentLoaded', function () {

    //Campos

    let body = document.querySelector("body");
    body.style.display = "block";

    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");
    let lada = document.getElementById("lada");
    let numero = document.getElementById("numero");
    let estado = document.getElementById("estado");
    let password = document.getElementById("password");
    let passwordConfirm = document.getElementById("passwordConfirm");
    let activacion = document.getElementById("activacion");
    let userId;

    numero.addEventListener("keypress", function (event) {
      let char = String.fromCharCode(event.which);
      if (!(/[0-9]/.test(char))) {
        event.preventDefault();
      }
    });

    //Boton
    let btnRegistrarse = document.getElementById("registrarse");

    btnRegistrarse.addEventListener("click", function () {

      if (nombre.value.trim() === "" || email.value.trim() === "" || numero.value.trim() === "" || password.value.trim() === "" ||
        passwordConfirm.value.trim() === "" || activacion.value.trim() === "") {
        Swal('Error', 'Por favor llene todos los campos', 'warning');
      } else if (!email.value.includes("@")) {
        Swal('Error', 'Introduce un correo valido', 'warning');
      } else if (password.value.length < 6) {
        Swal('Error', 'La contraseña debe de contener minimo 6 caracteres', 'warning');
      } else if (password.value !== passwordConfirm.value) {
        Swal('Error', 'Las contraseñas deben de conicidr', 'warning');
      } else if (activacion.value !== "BD755CBD8RVmGxeU") {
        Swal('Error', 'Clave de Activación no valida', 'error');
      } else {

        firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(function () {

          userId = firebase.auth().currentUser.uid;

          firebase.database().ref("Usuarios/" + userId + "/Datos_Usuario").set({
            Numero: lada.value + numero.value,
            Correo: email.value,
            Nombre: nombre.value,
            Estado: estado.value,
            Pago: "PAGADO",
            UserID: userId
          }, function (error) {
            if (!error) {
              location.href = "pantalla_principal.html";
            }
          });

        }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode === 'auth/email-already-in-use') {
            Swal('Error', 'Esa cuenta ya existe', 'error');
          } else if (errorCode === 'auth/network-request-failed') {
            Swal('Error', 'Verifique su conexión a Internet', 'error');
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