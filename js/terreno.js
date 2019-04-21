const Swal = require('sweetalert2');

let buttonPerfilClicked = false;

var paramstr = window.location.search.substr(1);
var paramarr = paramstr.split("&");
var params = {};

var modo;
var regresar;

for (var i = 0; i < paramarr.length; i++) {
  var tmparr = paramarr[i].split("=");
  params[tmparr[0]] = tmparr[1].toString();
}
if (params["modo"]) {
  modo = params["modo"];
  console.log(modo);
} else {
  console.log("No se envió el parámetro variable");
}

(function(){
  'use strict';

  document.addEventListener('DOMContentLoaded', function(){

    var config = {
      apiKey: "AIzaSyBYJJPXZGJYJgNdZIaIAXZZ0DE-3DsfSYw",
      authDomain: "inmobiliariasmx.firebaseapp.com",
      databaseURL: "https://inmobiliariasmx.firebaseio.com",
      projectId: "inmobiliariasmx",
      storageBucket: "inmobiliariasmx.appspot.com",
      messagingSenderId: "374273595319"
    };

    firebase.initializeApp(config);

    let enlace = document.getElementById("enlace");

    if(modo === "venta") {
      regresar = "venta";
    } else {
      regresar = "renta";
    }

    enlace.addEventListener("click", function() {
      window.location = regresar + ".html";
    });

    let dbRef = firebase.database().ref("Oferta/Aguascalientes");
    let storagePorfile = firebase.storage().ref("/profile_pictures");
    var storage = firebase.storage().ref("/fotos");

    var topShadow = document.getElementById("content-filtros");

    window.onscroll = function() {
      "use strict";
      if (document.body.scrollTop >= 20 || document.documentElement.scrollTop >= 20) {
        topShadow.classList.add("scroll");
      } else {
        topShadow.classList.remove("scroll");
      }
    };

    dbRef.on("child_added", function (snapshot) {

      let articulo = document.createElement("article");
      let casa = snapshot.val();
      let key = snapshot.key;

      articulo.setAttribute("id", key);

      let descripcion;
      let descripcionCorta;

      if(casa.descripcion !== undefined && casa.descripcion !== "") {
        descripcion = casa.descripcion;
        descripcionCorta = descripcion.substring(0, 40) + "...";
      }

      let precio = "$" + casa.precio.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      var contenido = `
      <div id="contenedor-img${key}" style="height: 200px;"></div>
      <div class="contenedor-inmueble clearfix">
        <span id="contenedor-porfile-img${key}"></span>
        <div class="nombre-descripcion">
          <p class="nombre">${casa.usuarioPoseedor}</p>
          <p>${descripcionCorta}</p>
        </div>
      </div>
      <div class="fracc-precio">
        <div class="fraccionamiento-contenedor">
          <i class="fas fa-map-marker-alt"></i>
          <p>${casa.fraccionamiento}</p>
        </div>
        <p class="precio">${precio}</p>
      </div>
      `;

      articulo.innerHTML = contenido;
      articulo.addEventListener("click", function(){
        if(buttonPerfilClicked === false) {
          var articleId = articulo.getAttribute("id");
          console.log(articleId);
          window.location = "infoCompletaPublico.html?id=" + articleId.toString();
        } else {
          buttonPerfilClicked = false;
        }
      });

      document.getElementById("main").appendChild(articulo);

      let imgCasa = document.createElement("img");

      storage.child(casa.userId + casa.id + "1").getDownloadURL().then(function(url) {
        imgCasa.src = url;
        document.getElementById("contenedor-img" + key).appendChild(imgCasa);
      }).catch(function(error) {
        imgCasa.src = "img/image_off.png";
        document.getElementById("contenedor-img" + key).appendChild(imgCasa);
      });

      let numeroUsuario;

      if(casa.numeroUsuario !== undefined && casa.numeroUsuario !== "") {
        if(casa.numeroUsuario.substring(0,1) === "5") {
          numeroUsuario = casa.numeroUsuario.substring(3, casa.numeroUsuario.length);
        } else if(casa.numeroUsuario.substring(0,1) === "1") {
          numeroUsuario = casa.numeroUsuario.substring(1, casa.numeroUsuario.length);
        }
      }

      let imagenPerfil = document.createElement("img");
      imagenPerfil.addEventListener("click", function(){
        buttonPerfilClicked = true;
        Swal.fire({
          title: 'Contacto',
          html: `<p id="numWhatsApp"><b>Número Telefónico:</b> ${numeroUsuario}<p>
                 <a href="mailto:${casa.correoUsuario}" class = "enviar-email"><b>Correo Electrónico: </b>${casa.correoUsuario}</a>`,
          showCloseButton: true,
          showConfirmButton: false
        });

        let numWhatsApp = document.getElementById("numWhatsApp");
        numWhatsApp.addEventListener("click", function() {
          require("electron").shell.openExternal("https://api.whatsapp.com/send?phone=" + casa.numeroUsuario);
        });

      });

      storagePorfile.child(casa.userId + "profilePicture").getDownloadURL().then(function(url) {
        imagenPerfil.src = url;
        document.getElementById("contenedor-porfile-img" + key).appendChild(imagenPerfil);

      }).catch(function(error) {
        imagenPerfil.src = "img/account_circle_grey.png";
        document.getElementById("contenedor-porfile-img" + key).appendChild(imagenPerfil);
      });

    });

  });

})();
