
const Swal = require('sweetalert2');
const jsPDF = require('jspdf');
const html2canvas = require('html2canvas');
var ref;
var refPublico;
var storage;
var casaid;
let userId;

let imgSrc = [];
let urlImgGrande;

let coordenadas;

let precio;

let campoEstado;
let campoDescripcion;
let campoCalle;
let campoFraccionamiento;
let campoMunicipio;
let campoEstadoLugar;
let campoAmueblada;
let campoSupConstruccion;
let campoNumRecamaras;
let campoCantidadCarrosCochera;
let campoSupTerreno;
let campoNPlantas;
let campoNumbanios;
let campoCosteMantenimiento;
let campoComision;
let campoNotas;
let campoInmobiliario;
let campoCorreoInmobiliario;
let campoNumInmobiliario;

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
      casaid = params["id"];
      
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

    let btnEditar = document.getElementById("btnEditar");
    let btnCrearPdf = document.getElementById("btnCrearPdf");
    let btnEliminar = document.getElementById("btnEliminar");

    let imgGrande = document.getElementById("img-grande");
    let contenedorArriba = document.getElementById("contenedor-arriba");
    let contenedorAbajo = document.getElementById("contenedor-abajo");

    let contenedorPdf = document.getElementById("contendor-pdf");

    storage = firebase.storage().ref("/fotos");

    btnEditar.addEventListener("click", function(){
      window.location = "editarDatos.html?id=" + casaid;
    });

    btnCrearPdf.addEventListener("click", function(){

      swal({
        title: "Creando PDF",
        allowOutsideClick: false
      });

      swal.showLoading();

      contenedorPdf.style.display = "block";

      var doc = new jsPDF('p', 'mm', 'legal');

      let pdf = `
      <div class="title-logo-pdf clearfix">
        <img src="img/logoPdf.jpg" class="logo">
        <h1 class="grupo-elite">Grupo de Inmobiliarios Elite</h1>
      </div>

      <div class="hrColorElite"></div>
      <div class="hrNegro"></div>

      <h4 class="pdf">Propiedad en: ${campoEstado} &nbsp; Ubicada en: ${campoMunicipio}, ${campoEstadoLugar}, México</h4>

      <div class="galeria-pdf">
        <div class="contenedor-imgGrande">
          <img src="${imgGrande.src}" class="imgPdfGrande">

          <h4 class="descripcion-pdf">Descripción:</h4>
          <p>${campoDescripcion}</p>

          <h4 class="precio-pdf">Precio: <span class="precio-pdf">${precio} MXN</span></h4>

          <h4 class="datos-generales-pdf">Datos Generales</h4>
          <h4 class="dato-general"><span class="dato">Construcción: </span>${campoSupConstruccion}</h4>
          <h4 class="dato-general"><span class="dato">Terreno: </span>${campoSupTerreno}</h4>
          <h4 class="dato-general"><span class="dato">N° Habitaciones: </span>${campoNumRecamaras}</h4>
          <h4 class="dato-general"><span class="dato">N° Baños: </span>${campoNumbanios}</h4>
          <h4 class="dato-general"><span class="dato">N° Plantas: </span>${campoNPlantas}</h4>
          <h4 class="dato-general"><span class="dato">Amueblada: </span>${campoAmueblada}</h4>
          <h4 class="dato-general"><span class="dato">N° Cocheras: </span>${campoCantidadCarrosCochera}</h4>

          <h4 class="ubicacion-pdf">Ubicación</h4>
          <h4 class="fraccionamiento-pdf">Fraccionamiento: <span class="normal">${campoFraccionamiento}</span></h4>
          <h4>Notas: <span class="normal">${campoNotas}</span></h4>

        </div>
        <div class="multiple-imgs-pdf">
          <img src="${imgSrc[0]}" class="imgPdf">
          <img src="${imgSrc[1]}" class="imgPdf">
          <img src="${imgSrc[2]}" class="imgPdf">
          <img src="${imgSrc[3]}" class="imgPdf">

          <h4 class="inmobiliario">Inmobiliario</h4>
          <p>${campoInmobiliario}</p>
          <h4 class="contacto">Contacto</h4>
          <p class="numInmobiliario">${campoNumInmobiliario}</p>
          <p>${campoCorreoInmobiliario}</p>
        </div>
      </div>

      `;

      contenedorPdf.innerHTML = pdf;

      html2canvas(contenedorPdf, {
        allowTaint: true
      }).then(canvas => {
        var imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 0, 0);
        swal.close();
        contenedorPdf.style.display = "none";
        doc.save('PDF.pdf');
      });

    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        ref = firebase.database().ref("/Usuarios").child(user.uid + "/Propiedades/" + casaid);

        ref.on("value", function(snapshot) {
          var casa = snapshot.val();
          var key = snapshot.key;

          refPublico = firebase.database().ref("/Oferta").child(casa.estadoUsuario+"/"+casa.id);

          userId = casa.userId;

          campoEstado = casa.estado;
          campoDescripcion = casa.descripcion;
          campoCalle = casa.calle;
          campoFraccionamiento = casa.fraccionamiento;
          campoMunicipio = casa.municipio;
          campoEstadoLugar = casa.estadoLugar;
          campoAmueblada = casa.amueblada;
          campoSupConstruccion = casa.supConstruccion;
          campoNumRecamaras = casa.numRecamaras;
          campoCantidadCarrosCochera = casa.cantidadCarrosCochera;
          campoNumbanios = casa.numbanios;
          campoNPlantas = casa.nPlantas;
          campoSupTerreno = casa.supTerreno;
          campoCosteMantenimiento = casa.costeMantenimiento;
          campoComision = casa.comision;
          campoNotas = casa.notas;
          campoInmobiliario = casa.usuarioPoseedor;
          campoCorreoInmobiliario = casa.correoUsuario;


          if(casa.numeroUsuario !== undefined && casa.numeroUsuario !== "") {
            if(casa.numeroUsuario.substring(0,1) === "5") {
              campoNumInmobiliario = casa.numeroUsuario.substring(3, casa.numeroUsuario.length);
            } else if(casa.numeroUsuario.substring(0,1) === "1") {
              campoNumInmobiliario = casa.numeroUsuario.substring(1, casa.numeroUsuario.length);
            }
          }

          btnEliminar.addEventListener("click", function(){

            Swal.fire({
              title: '¿Desea Eliminarlo?',
              type: 'warning',
              showCancelButton: true,
              cancelButtonText: 'No',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si'
            }).then((result) => {
              if (result.value) {
                
                let borrarImg1 = new Promise(function(resolve, reject) {
                  storage.child(userId + casaid + 1).delete().then(function() {
                    resolve();
                  }).catch(function(error) {
                    resolve();
                  });
                });

                let borrarImg2 = new Promise(function(resolve, reject) {
                  storage.child(userId + casaid + 2).delete().then(function() {
                    resolve();
                  }).catch(function(error) {
                    resolve();
                  });
                });

                let borrarImg3 = new Promise(function(resolve, reject) {
                  storage.child(userId + casaid + 3).delete().then(function() {
                    resolve();
                  }).catch(function(error) {
                    resolve();
                  });
                });

                let borrarImg4 = new Promise(function(resolve, reject) {
                  storage.child(userId + casaid + 4).delete().then(function() {
                    resolve();
                  }).catch(function(error) {
                    resolve();
                  });
                });

                let borrarImg5 = new Promise(function(resolve, reject) {
                  storage.child(userId + casaid + 5).delete().then(function() {
                    resolve();
                  }).catch(function(error) {
                    resolve();
                  });
                });

                let borrarDatos = new Promise(function(resolve, reject) {
                  ref.remove().then(function() {
                    resolve();
                  }).catch(function(error) {
                    reject();
                  });
                });

                let borrarDatosPublico = new Promise(function(resolve, reject) {
                  refPublico.remove().then(function() {
                    resolve();
                  }).catch(function(error) {
                    reject();
                  });
                });

                Promise.all([borrarImg1, borrarImg2, borrarImg3, borrarImg4, borrarImg5, borrarDatos, borrarDatosPublico]).then(function() {
                  location.href = "inventario.html";
                }).catch(function(error) {
                  
                });

              }
            });

          });

          storage.child(casa.userId + casa.id + "1").getDownloadURL().then(function(url) {
              imgGrande.src = url;
            }).catch(function(error) {

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
                  imgSrc.push(imgCasa.src);
                }).catch(function(error) {

                });
            }

            precio = "$" + casa.precio.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            let arriba = `
              <h1 id="estado">Propiedad en ${campoEstado}</h1>
              <p id="descripcion">${campoDescripcion}</p>
              <div class="clearfix">
                <p id="precio"><span class="precioName">Precio: </span><span class="precioNumber">${precio} MXN</span></p><i class="fas fa-map-marked-alt mapa" id="goMaps"></i>
              </div>
            `;

            let abajo = `
              <div class="hr" id="hr-propio"></div>
              <h3>Ubicación</h3>
              <div class="ubicacion">
                <p id="calle"><span class="letras-grises">Calle: </span>${campoCalle}</p>
                <p id="fraccionamiento"><span class="letras-grises">Fraccionamiento: </span>${campoFraccionamiento}</p>
                <p id="numInterior"><span class="letras-grises">Núm. Interior: </span>${casa.numInt}</p>
                <p id="numExterior"><span class="letras-grises">Núm. Exterior: </span>${casa.numExt}</p>
                <p id="municipio"><span class="letras-grises">Municipio: </span>${campoMunicipio}</p>
                <p id="estadoLugar"><span class="letras-grises">Estado: </span>${campoEstadoLugar}</p>
                <p id="cPostal"><span class="letras-grises">Código Postal: </span>${casa.codigoPostal}</p>
              </div>

              <div class="hr" id="hr-propio"></div>
              <h3 class="title-datos">Datos Generales</h3>
              <div class="contenedor-datos-generales">
                  <div class="dato-general"><p id="amueblada"><i class="fas fa-couch"></i>Amueblada: ${casa.amueblada}</p></div>
                  <div class="dato-general"><p id="construccion"><i class="fas fa-wrench"></i>Construcción: ${casa.supConstruccion}</p></div>
                  <div class="dato-general"><p id="nRecamaras"><i class="fas fa-bed"></i>N° Recamaras: ${casa.numRecamaras}</p></div>
                  <div class="dato-general"><p id="nCarros"><i class="fas fa-car"></i>N° Carros: ${casa.cantidadCarrosCochera}</p></div>
                  <div class="dato-general"><p id="terreno"><i class="fas fa-mountain"></i>Terreno: ${casa.supTerreno}</p></div>
                  <div class="dato-general"><p id="nPlantas"><i class="fas fa-home"></i>N° Plantas: ${casa.nPlantas}</p></div>
                  <div class="dato-general"><p id="nBanios"><i class="fas fa-toilet-paper"></i>N° Baños: ${casa.numBanios}</p></div>
                  <div class="dato-general"><p id="costoMantenimiento"><i class="fas fa-dollar-sign"></i>Costo Mantenimiento: ${casa.costeMantenimiento}</p></div>
                  <div class="dato-general"><p id="comision"><i class="fas fa-percentage"></i>Porcentaje de Comisión: ${casa.comision}</p></div>
              </div>

              <div class="notas clearfix">
                <i class="fas fa-tags notas"></i>
                <p>${campoNotas}</p>
              </div>
            `;

            contenedorArriba.innerHTML = arriba;
            contenedorAbajo.innerHTML = abajo;

            let goMaps = document.getElementById("goMaps");

            goMaps.addEventListener("click", function() {
              coordenadas = casa.lugar;
              if(coordenadas !== "") {
                let url = "https://www.google.com.mx/maps/search/" + casa.lugar;
                require("electron").shell.openExternal(url);
              } else {
                Swal('Error','No ha selecionado algún lugar','error');
              }
            });

        });
      }
    });

  });

})();
