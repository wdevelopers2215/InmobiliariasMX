<<<<<<< HEAD
const Swal = require('sweetalert2');

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

    var storage = firebase.storage().ref("/fotos");

    var topShadow = document.getElementById("menu-filtros");

    window.onscroll = function() {
      "use strict";
      if (document.body.scrollTop >= 20 || document.documentElement.scrollTop >= 20) {
        topShadow.classList.add("scroll");
      } else {
        topShadow.classList.remove("scroll");
      }
    };

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        let dbRef = firebase.database().ref("Usuarios/" + user.uid + "/Propiedades");

        dbRef.on("child_added", function (snapshot){

          let articulo = document.createElement("article");
          let casa = snapshot.val();
          let key = snapshot.key;

          console.log(key);

          articulo.setAttribute("id", key);

          let descripcion = casa.descripcion;
          let descripcionCorta = descripcion.substring(0, 40) + "...";
          let precio = "$" + casa.precio.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          var contenido = `
          <div id="contenedor-img${key}" style="height: 200px;"></div>
          <div class="contenedor-inmueble clearfix">
            <div class="nombre-descripcion">
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
              var articleId = articulo.getAttribute("id");
              console.log(articleId);
              window.location = "infoCompletaPropio.html?id=" + articleId.toString();
          });
          document.getElementById("main").appendChild(articulo);

          let imgCasa = document.createElement("img");
          storage
            .child(user.uid + casa.id + "1")
            .getDownloadURL()
            .then(function(url) {
              imgCasa.src = url;
              document.getElementById("contenedor-img" + key).appendChild(imgCasa);

            })
            .catch(function(error) {
              imgCasa.src = "img/image_off.png";
              document.getElementById("contenedor-img" + key).appendChild(imgCasa);
            });

        });

      }
    });

  });

})();
=======
const Swal = require('sweetalert2');

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

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        let dbRef = firebase.database().ref("Usuarios/" + user.uid + "/Propiedades");

        dbRef.on("child_added", function (snapshot){

          let articulo = document.createElement("article");
          let casa = snapshot.val();
          let key = snapshot.key;

          console.log(key);

          articulo.setAttribute("id", key);

          let descripcion = casa.descripcion;
          let descripcionCorta = descripcion.substring(0, 40) + "...";
          let precio = "$" + casa.precio.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          var contenido = `
          <div id="contenedor-img${key}" style="height: 200px;"></div>
          <div class="contenedor-inmueble clearfix">
            <div class="nombre-descripcion">
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
              var articleId = articulo.getAttribute("id");
              console.log(articleId);
              window.location = "infoCompletaPropio.html?id=" + articleId.toString();
          });
          document.getElementById("main").appendChild(articulo);

          let imgCasa = document.createElement("img");
          storage
            .child(user.uid + casa.id + "1")
            .getDownloadURL()
            .then(function(url) {
              imgCasa.src = url;
              document.getElementById("contenedor-img" + key).appendChild(imgCasa);

            })
            .catch(function(error) {
              imgCasa.src = "img/image_off.png";
              document.getElementById("contenedor-img" + key).appendChild(imgCasa);
            });

        });

      }
    });

  });

})();
>>>>>>> 9daba400ea2cbc188df48a5c7eeb64eae7bcca1b
