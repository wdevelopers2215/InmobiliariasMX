var config = {
  apiKey: "AIzaSyBYJJPXZGJYJgNdZIaIAXZZ0DE-3DsfSYw",
  authDomain: "inmobiliariasmx.firebaseapp.com",
  databaseURL: "https://inmobiliariasmx.firebaseio.com",
  projectId: "inmobiliariasmx",
  storageBucket: "inmobiliariasmx.appspot.com",
  messagingSenderId: "374273595319"
};
firebase.initializeApp(config);

const Swal = require('sweetalert2');

var img;
let contenedorImg1;
let contenedorImg2;
let contenedorImg3;
let contenedorImg4;
let contenedorImg5;

let imgPropiedad1;
let imgPropiedad2;
let imgPropiedad3;
let imgPropiedad4;
let imgPropiedad5;

let imgBloobs = [];

var marker;
var infowindow;

let coordenadas;
let lugarSelecionado;

(function(){
  'use strict';

  document.addEventListener('DOMContentLoaded', function(){

    var topShadow = document.getElementById("top-nuevo_inmueble");

    window.onscroll = function() {
      "use strict";
      if (document.body.scrollTop >= 20 || document.documentElement.scrollTop >= 20) {
        topShadow.classList.add("scroll");
      } else {
        topShadow.classList.remove("scroll");
      }
    };

    //Campos
    let calle = document.getElementById("calle");
    let numInt = document.getElementById("numInt");
    let numExt = document.getElementById("numExt");
    let fraccionamiento = document.getElementById("fraccionamiento");
    let estadoLugar = document.getElementById("estadoLugar");
    let municipio = document.getElementById("municipio");
    let codigoPostal = document.getElementById("codigoPostal");
    let supTerreno = document.getElementById("supTerreno");
    let supConstruccion = document.getElementById("supConstruccion");
    let nPlantas = document.getElementById("nPlantas");
    let numRecamaras = document.getElementById("numRecamaras");
    let numbanios = document.getElementById("numbanios");
    let amueblada = document.getElementById("amueblada");
    let estadoVoR = document.getElementById("estadoVoR");
    let tipo = document.getElementById("tipo");

    let cantidadCarrosCochera = document.getElementById("cantidadCarrosCochera");
    let costeMantenimiento = document.getElementById("costeMantenimiento");
    let precio = document.getElementById("precio");
    let comision = document.getElementById("comision");
    let descripcion = document.getElementById("descripcion");
    let notas = document.getElementById("notas");

    let placeSelecionada = document.getElementById("lugarSelect");

    let fecha = new Date();
    let fechaMes = fecha.getMonth() + 1;
    let fechaDia = fecha.getDate().toString();
    let fechaAnio = fecha.getFullYear().toString();
    let fechaCaptura = fecha.getSeconds().toString() + "-" + fecha.getMinutes().toString() + "-" +
                       fecha.getHours().toString() + "-" + fechaDia + "-" + fechaMes.toString() + "-" + fechaAnio;

    let idOferta;
    let precioFinal;

    let userId;
    let usuarioPoseedor;
    let numeroUsuario;
    let correoUsuario;
    let estadoUsuario;


    //Botones
    let btnMaps = document.getElementById("maps");
    let btnGuardar = document.getElementById("guardar");
    let btnCancelar = document.getElementById("cancelar");
    let btnImg1 = document.getElementById("butonImg1");
    let btnImg2 = document.getElementById("butonImg2");
    let btnImg3 = document.getElementById("butonImg3");
    let btnImg4 = document.getElementById("butonImg4");
    let btnImg5 = document.getElementById("butonImg5");

    let guardarCroppedImg = document.getElementById("guardarImg");
    let selecionarLugar = document.getElementById("selecionarLugar");

    //Contenedores de Imagenes
    contenedorImg1 = document.getElementById("contenedor-img-propiedad1");
    contenedorImg2 = document.getElementById("contenedor-img-propiedad2");
    contenedorImg3 = document.getElementById("contenedor-img-propiedad3");
    contenedorImg4 = document.getElementById("contenedor-img-propiedad4");
    contenedorImg5 = document.getElementById("contenedor-img-propiedad5");

    imgPropiedad1 = document.getElementById("contendor-img1");
    imgPropiedad2 = document.getElementById("contendor-img2");
    imgPropiedad3 = document.getElementById("contendor-img3");
    imgPropiedad4 = document.getElementById("contendor-img4");
    imgPropiedad5 = document.getElementById("contendor-img5");

    //Inputs File
    let input1 = document.getElementById("image-input1");
    let input2 = document.getElementById("image-input2");
    let input3 = document.getElementById("image-input3");
    let input4 = document.getElementById("image-input4");
    let input5 = document.getElementById("image-input5");

    let numeroImg;

    $('#precio').keyup(function(event) {
      if(event.which >= 37 && event.which <= 40) return;
      $(this).val(function(index, value) {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });
    });

    $('#costeMantenimiento').keyup(function(event) {
      if(event.which >= 37 && event.which <= 40) return;
      $(this).val(function(index, value) {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      });
    });

    $('#nPlantas').keyup(function(event) {
      if(event.which >= 37 && event.which <= 40) return;
      $(this).val(function(index, value) {
        return value.replace(/\D/g, "");
      });
    });

    $('#supConstruccion').keyup(function(event) {
      if(event.which >= 37 && event.which <= 40) return;
      $(this).val(function(index, value) {
        return value.replace(/\D/g, "");
      });
    });

    $('#supTerreno').keyup(function(event) {
      if(event.which >= 37 && event.which <= 40) return;
      $(this).val(function(index, value) {
        return value.replace(/\D/g, "");
      });
    });

    $('#numRecamaras').keyup(function(event) {
      if(event.which >= 37 && event.which <= 40) return;
      $(this).val(function(index, value) {
        return value.replace(/\D/g, "");
      });
    });

    $('#cantidadCarrosCochera').keyup(function(event) {
      if(event.which >= 37 && event.which <= 40) return;
      $(this).val(function(index, value) {
        return value.replace(/\D/g, "");
      });
    });

    $('#comision').keyup(function(event) {
      if(event.which >= 37 && event.which <= 40) return;
      $(this).val(function(index, value) {
        return value.replace(/\D/g, "");
      });
    });

    $('#numbanios').keypress(function(event) {
      if (((event.which != 46 || (event.which == 46 && $(this).val() == '')) ||
              $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
          event.preventDefault();
      }
    }).on('paste', function(event) {
        event.preventDefault();
    });

    let modalMaps = document.getElementById("modalMaps");
    let closeModalMaps = document.getElementById("close-modalMaps");

    closeModalMaps.onclick = function() {
      modalMaps.style.display = "none";
    }

    btnMaps.addEventListener("click", function() {
      modalMaps.style.display = "block";
    });

    selecionarLugar.addEventListener("click", function() {
      coordenadas = marker.getPosition().lat() + "," + marker.getPosition().lng();
      lugarSelecionado = infowindow.getContent();
      placeSelecionada.innerHTML = lugarSelecionado;
      modalMaps.style.display = "none";
    });

    btnGuardar.addEventListener("click", function(){

      swal({
        title: "Guardando, Por Favor Espere",
        allowOutsideClick: false
      });
      swal.showLoading();

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

           userId = user.uid;
           idOferta = fechaCaptura + userId;

           let dbRef = firebase.database().ref("Usuarios/" + userId + "/Datos_Usuario");

           dbRef.on("value", function (snapshot){

             let datos = snapshot.val();
             usuarioPoseedor = datos.Nombre.toString();
             numeroUsuario = datos.Numero.toString();
             correoUsuario = datos.Correo.toString();
             estadoUsuario = datos.Estado.toString();

             if(precio.value.trim() === "") {
               precioFinal = "0";
             } else {
               let precioSinComas = precio.value.toString().replace(/,/g, '');
               precioFinal = precioSinComas;
             }

             let costeMantenimientoSinComas;

             if(costeMantenimiento.value.trim() !== "") {
               costeMantenimientoSinComas = costeMantenimiento.value.toString().replace(/,/g, '');
             } else {
               costeMantenimientoSinComas = "";
             }

             if(coordenadas === undefined) {
               coordenadas = "";
             }

             if(lugarSelecionado === undefined) {
               lugarSelecionado = "";
             }

             firebase.database().ref("Usuarios/" + userId + "/Propiedades/" + fechaCaptura + userId).set({
               id: idOferta,
               ubicacion: "",
               direccion: calle.value.toString() + " " + numInt.value.toString() + " " + fraccionamiento.value.toString(),
               supTerreno: supTerreno.value.toString(),
               supConstruccion: supConstruccion.value.toString(),
               precio: precioFinal,
               comision: comision.value.toString(),
               estado: estadoVoR.value.toString(),
               numRecamaras: numRecamaras.value.toString(),
               numbanios: numbanios.value.toString(),
               cantidadCarrosCochera: cantidadCarrosCochera.value.toString(),
               costeMantenimiento: costeMantenimientoSinComas,
               descripcion: descripcion.value.toString(),
               nPlantas: nPlantas.value.toString(),
               notas: notas.value.toString(),
               usuarioPoseedor: usuarioPoseedor,
               numeroUsuario: numeroUsuario,
               correoUsuario: correoUsuario,
               estadoUsuario: estadoUsuario,
               userId: userId.toString(),
               calle: calle.value.toString(),
               numInt: numInt.value.toString(),
               numExt: numExt.value.toString(),
               fraccionamiento: fraccionamiento.value.toString(),
               estadoLugar: estadoLugar.value.toString(),
               municipio: municipio.value.toString(),
               codigoPostal: codigoPostal.value.toString(),
               amueblada: amueblada.value.toString(),
               fechaCaptura: fechaCaptura.toString(),
               latlong: coordenadas,
               lugar: lugarSelecionado,
               dia: fechaDia,
               mes: fechaMes.toString(),
               anio: fechaAnio,
               reserva: "Sin reserva",
               tipo: tipo.value.toString()

             }, function(error){
               if(!error) {

                firebase.database().ref("Oferta/"+estadoUsuario+"/"+idOferta).set({
                 id: idOferta,
                 respaldoId: idOferta,
                 ubicacion: "",
                 direccion: calle.value.toString() + " " + numInt.value.toString() + " " + fraccionamiento.value.toString(),
                 supTerreno: supTerreno.value.toString(),
                 supConstruccion: supConstruccion.value.toString(),
                 precio: precioFinal,
                 comision: comision.value.toString(),
                 estado: estadoVoR.value.toString(),
                 numRecamaras: numRecamaras.value.toString(),
                 numBanios: numbanios.value.toString(),
                 cantidadCarrosCochera: cantidadCarrosCochera.value.toString(),
                 costeMantenimiento: costeMantenimientoSinComas,
                 descripcion: descripcion.value.toString(),
                 nPlantas: nPlantas.value.toString(),
                 notas: notas.value.toString(),
                 usuarioPoseedor: usuarioPoseedor,
                 numeroUsuario: numeroUsuario,
                 correoUsuario: correoUsuario,
                 estadoUsuario: estadoUsuario,
                 userId: userId.toString(),
                 calle: calle.value.toString(),
                 numInt: numInt.value.toString(),
                 numExt: numExt.value.toString(),
                 fraccionamiento: fraccionamiento.value.toString(),
                 estadoLugar: estadoLugar.value.toString(),
                 municipio: municipio.value.toString(),
                 codigoPostal: codigoPostal.value.toString(),
                 amueblada: amueblada.value.toString(),
                 fechaCaptura: fechaCaptura.toString(),
                 reserva: "Sin reserva",
                 hora_reserva: "",
                 cliente_reserva: "",
                 dia: fechaDia,
                 mes: fechaMes.toString(),
                 anio: fechaAnio,
                 latlong: coordenadas,
                 tipo: tipo.value.toString()

                 }, function(error){
                   if(!error) {
                     var storageRef = firebase.storage().ref();

                     if(imgBloobs.length === 5) {
                       var uploadImage = storageRef.child("fotos/" + userId + idOferta + 1).put(imgBloobs[0]).then(function(snapshot) {
                         
                         var uploadImage = storageRef.child("fotos/" + userId + idOferta + 2).put(imgBloobs[1]).then(function(snapshot) {
                           
                           var uploadImage = storageRef.child("fotos/" + userId + idOferta + 3).put(imgBloobs[2]).then(function(snapshot) {
                             
                             var uploadImage = storageRef.child("fotos/" + userId + idOferta + 4).put(imgBloobs[3]).then(function(snapshot) {
                               
                               var uploadImage = storageRef.child("fotos/" + userId + idOferta + 5).put(imgBloobs[4]).then(function(snapshot) {
                                 

                                 swal.close();
                                 location.href = "inventario.html";
                               });
                             });
                           });
                         });
                       });
                     } else if(imgBloobs.length === 4) {
                       var uploadImage = storageRef.child("fotos/" + userId + idOferta + 1).put(imgBloobs[0]).then(function(snapshot) {
                         
                         var uploadImage = storageRef.child("fotos/" + userId + idOferta + 2).put(imgBloobs[1]).then(function(snapshot) {
                           
                           var uploadImage = storageRef.child("fotos/" + userId + idOferta + 3).put(imgBloobs[2]).then(function(snapshot) {
                             
                             var uploadImage = storageRef.child("fotos/" + userId + idOferta + 4).put(imgBloobs[3]).then(function(snapshot) {
                               
                               swal.close();
                               location.href = "inventario.html";
                             });
                           });
                         });
                       });
                     } else if(imgBloobs.length === 3) {
                       var uploadImage = storageRef.child("fotos/" + userId + idOferta + 1).put(imgBloobs[0]).then(function(snapshot) {
                         
                         var uploadImage = storageRef.child("fotos/" + userId + idOferta + 2).put(imgBloobs[1]).then(function(snapshot) {
                           
                           var uploadImage = storageRef.child("fotos/" + userId + idOferta + 3).put(imgBloobs[2]).then(function(snapshot) {
                             
                             swal.close();
                             location.href = "inventario.html";
                           });
                         });
                       });
                     } else if(imgBloobs.length === 2) {
                       var uploadImage = storageRef.child("fotos/" + userId + idOferta + 1).put(imgBloobs[0]).then(function(snapshot) {
                         
                         var uploadImage = storageRef.child("fotos/" + userId + idOferta + 2).put(imgBloobs[1]).then(function(snapshot) {
                           
                           swal.close();
                           location.href = "inventario.html";
                         });
                       });
                     } else if(imgBloobs.length === 1) {
                       var uploadImage = storageRef.child("fotos/" + userId + idOferta + 1).put(imgBloobs[0]).then(function(snapshot) {
                         
                         swal.close();
                         location.href = "inventario.html";
                       });
                     } else if(imgBloobs.length === 0) {
                       location.href = "inventario.html";
                     }

                   } else {
                     swal.close();
                     Swal('Error','Ocurrió un Error, verifique su conexión a internet','error');
                   }
                 });


               } else {
                 swal.close();
                 Swal('Error','Ocurrió un Error, verifique su conexión a internet','error');
               }

             });

          });//Nombre, Correo, etc

        }//if user

      });//firebaseAuth

    });//btnGuardar

    btnCancelar.addEventListener("click", function(){
      location.href = "inventario.html";
    });

    //ModalImg e imagenes
    let modalImg = document.getElementById("modalImg");
    let span = document.getElementById("close");

    span.onclick = function() {
      modalImg.style.display = "none";
    }

    //Cerrar el modal cuando de clic en cualquier parte de la pantalla
    window.onclick = function(event) {
      if (event.target === modalImg) {
        modalImg.style.display = "none";
      }
    }

    btnImg1.addEventListener("click", function(){
      input1.click();
    });

    input1.addEventListener("change", function(e) {
      croppImge(e);
      numeroImg = 1;
    });

    btnImg2.addEventListener("click", function(){
      input2.click();
    });

    input2.addEventListener("change", function(e) {
      croppImge(e);
      numeroImg = 2;
    });

    btnImg3.addEventListener("click", function(){
      input3.click();
    });

    input3.addEventListener("change", function(e) {
      croppImge(e);
      numeroImg = 3;
    });

    btnImg4.addEventListener("click", function(){
      input4.click();
    });

    input4.addEventListener("change", function(e) {
      croppImge(e);
      numeroImg = 4;
    });

    btnImg5.addEventListener("click", function(){
      input5.click();
    });

    input5.addEventListener("change", function(e) {
      croppImge(e);
      numeroImg = 5;
    });

    guardarCroppedImg.addEventListener("click", function(e){
      var cropper = img.data('cropper');
      var cropeddImg = cropper.getCroppedCanvas();
      cropeddImg.toBlob(function (blob) {
        imgBloobs.push(blob);
      }, 'image/jpeg', 0.3);
      numImg(numeroImg, cropeddImg);
      modalImg.style.display = "none";

    });

  });

})();

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 21.879610, lng: -102.295227},
    zoom: 13
  });

  var input = document.getElementById('pac-input');

  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);

  // Specify just the place data fields that you need.
  autocomplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  infowindow = new google.maps.InfoWindow();

  var geocoder = new google.maps.Geocoder;

  marker = new google.maps.Marker({
    map: map,
    draggable: true
  });

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      var latLong = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

      geocoder.geocode({'latLng': latLong}, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            marker.setPosition(latLong);
            infowindow.setPosition(pos);
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
            map.setCenter(pos);
          }
      });

    });
  }

  marker.addListener("drag", function(event) {
    infowindow.close();
  });

  marker.addListener("dragend", function(event) {
    geocoder.geocode({'latLng': marker.getPosition()}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
        }
    });

  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();

    if (!place.place_id) {
      return;
    }
    geocoder.geocode({'placeId': place.place_id}, function(results, status) {
      if (status !== 'OK') {
        window.alert('Geocoder failed due to: ' + status);
        return;
      }

      marker.setPosition(results[0].geometry.location);
      infowindow.setPosition(results[0].geometry.location);
      infowindow.setContent(results[0].formatted_address);
      infowindow.open(map, marker);
      map.setCenter(results[0].geometry.location);
      map.setZoom(16);
    });
  });
}

function croppImge(e) {
  let imgPropiedadCropper = document.getElementById("img-propiedad-cropper");
  img = $("#img-propiedad-cropper");
  img.cropper("destroy");
  modalImg.style.display = "block";
  imgPropiedadCropper.src = URL.createObjectURL(e.target.files[0]);

  img.cropper({
    zoomOnWheel: false,
    autoCropArea: 1,
    guides: false
  });

  $('input[type="file"]').val("");
}

function numImg(num, croppedCanvas) {
  if(num === 1) {
    contenedorImg1.style.display = "block";
    imgPropiedad1.src = croppedCanvas.toDataURL();
  } else if(num === 2) {
    contenedorImg2.style.display = "block";
    imgPropiedad2.src = croppedCanvas.toDataURL();
  } else if(num === 3) {
    contenedorImg3.style.display = "block";
    imgPropiedad3.src = croppedCanvas.toDataURL();
  } else if(num === 4) {
    contenedorImg4.style.display = "block";
    imgPropiedad4.src = croppedCanvas.toDataURL();
  } else if(num === 5) {
    contenedorImg5.style.display = "block";
    imgPropiedad5.src = croppedCanvas.toDataURL();
  }
}
