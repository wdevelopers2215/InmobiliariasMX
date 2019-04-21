
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

    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split("&");
    var params = {};

    for (var i = 0; i < paramarr.length; i++) {
      var tmparr = paramarr[i].split("=");
      params[tmparr[0]] = tmparr[1].toString();
    }
    if (params["id"]) {
      var casaid = params["id"];
      console.log(casaid);
    } else {
      console.log("No se envió el parámetro variable");
    }

    var topShadow = document.getElementById("top-menu-shadow");

    window.onscroll = function() {
      "use strict";
      if (document.body.scrollTop >= 20 || document.documentElement.scrollTop >= 20) {
        topShadow.classList.add("scroll");
      } else {
        topShadow.classList.remove("scroll");
      }
    };

    let imgGrande = document.getElementById("img-grande");
    let contenedorArriba = document.getElementById("contenedor-arriba");
    let contenedorAbajo = document.getElementById("contenedor-abajo");

    var ref = firebase.database().ref("/Oferta").child("Aguascalientes/" + casaid);
    var storage = firebase.storage().ref("/fotos");

    ref.on("value", function(snapshot) {
      var casa = snapshot.val();
      var keyp = snapshot.key;
      storage.child(casa.userId + casa.id + "1").getDownloadURL().then(function(url) {
          /*src = url;
          console.log(casa.userId + casa.id + "1" + " " + url);
          crearItem(casa, url);*/
          imgGrande.src = url;
        }).catch(function(error) {
          imgGrande.src = "img/image_off.png";
        });


        for (var i = 1; i <= 4; i++) {
          storage.child(casa.userId + casa.id + (i + 1)).getDownloadURL().then(function(url) {
              let contedorImgGaleria = document.createElement("div");
              contedorImgGaleria.setAttribute("class", "contedorImgGaleria");

              let imgCasa = document.createElement("img");
              imgCasa.setAttribute("class", "imgCasaGaleria");
              imgCasa.src = url;
              contedorImgGaleria.appendChild(imgCasa);
              document.getElementById("galeria").appendChild(contedorImgGaleria);
            })
            .catch(function(error) {

            });
        }

        let precio = "$" + casa.precio.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        let arriba = `
          <h1 id="estado">Propiedad en ${casa.estado}</h1>
          <p id="descripcion">${casa.descripcion}</p>
          <p id="precioPublico"><span class="precioName">Precio: </span><span class="precioNumber">${precio} MXN</span></p>
        `;

        /*<p id="contacto">Contacto</p>
        <p id="correo">Correo: ${casa.correoUsuario}</p>
        <p id="telefono">Teléfono: ${casa.numeroUsuario}</p>*/

        let abajo = `
          <div class="hr"></div>
          <h3>Ubicación</h3>
          <div class="ubicacion">
            <p id="fraccionamiento"><span class="letras-grises">Fraccionamiento: </span>${casa.fraccionamiento}</p>
            <p id="municipio"><span class="letras-grises">Municipio: </span>${casa.municipio}</p>
            <p id="estadoLugar"><span class="letras-grises">Estado: </span>${casa.estadoLugar}</p>
            <p id="cPostal"><span class="letras-grises">Código Postal: </span>${casa.codigoPostal}</p>
          </div>

          <div class="hr"></div>
          <h3 class="title-datos">Datos Generales</h3>
          <div class="contenedor-datos-generales">
            <section>
              <div class="dato-general"><i class="fas fa-couch"></i><p id="amueblada">Amueblada: ${casa.amueblada}</p></div>
              <div class="dato-general"><i class="fas fa-wrench"></i><p id="construccion">Construcción: ${casa.supConstruccion}</p></div>
              <div class="dato-general"><i class="fas fa-bed"></i><p id="nRecamaras">N° Recamaras: ${casa.numRecamaras}</p></div>
            </section>

            <section>
              <div class="dato-general"><i class="fas fa-car"></i><p id="nCarros">N° Carros: ${casa.cantidadCarrosCochera}</p></div>
              <div class="dato-general"><i class="fas fa-mountain"></i><p id="terreno">Terreno: ${casa.supTerreno}</p></div>
              <div class="dato-general"><i class="fas fa-home"></i><p id="nPlantas">N° Plantas: ${casa.nPlantas}</p></div>
            </section>

            <section>
              <div class="dato-general"><i class="fas fa-toilet-paper"></i><p id="nBanios">N° Baños: ${casa.numBanios}</p></div>
              <div class="dato-general"><i class="fas fa-dollar-sign"></i><p id="costoMantenimiento">Costo Mantenimiento: ${casa.costeMantenimiento}</p></div>
              <div class="dato-general"><i class="fas fa-percentage"></i><p id="comision">Porcentaje de Comisión: ${casa.comision}</p></div>
            </section>
          </div>

          <div class="notas clearfix">
            <i class="fas fa-tags notas"></i>
            <p>${casa.notas}</p>
          </div>
        `;

        contenedorArriba.innerHTML = arriba;
        contenedorAbajo.innerHTML = abajo;

    });

  });

})();
