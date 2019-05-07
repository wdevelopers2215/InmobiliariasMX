<<<<<<< HEAD
// const Swal = require("sweetalert2");

// let buttonPerfilClicked = false;

// (function() {
//   "use strict";

//   document.addEventListener("DOMContentLoaded", function() {
//     var config = {
//       apiKey: "AIzaSyBYJJPXZGJYJgNdZIaIAXZZ0DE-3DsfSYw",
//       authDomain: "inmobiliariasmx.firebaseapp.com",
//       databaseURL: "https://inmobiliariasmx.firebaseio.com",
//       projectId: "inmobiliariasmx",
//       storageBucket: "inmobiliariasmx.appspot.com",
//       messagingSenderId: "374273595319"
//     };

//     firebase.initializeApp(config);

//     let dbRef = firebase.database().ref("Oferta/Aguascalientes");
//     let storagePorfile = firebase.storage().ref("/profile_pictures");
//     var storage = firebase.storage().ref("/fotos");

//     var topShadow = document.getElementById("content-filtros");

//     let habitacional = document.getElementById("habitacional");
//     let comercial = document.getElementById("comercial");
//     let rustico = document.getElementById("rustico");
//     let terreno = document.getElementById("terreno");

//     habitacional.addEventListener("click", function() {
//       window.location = "habitacional.html?modo=venta";
//     });

//     comercial.addEventListener("click", function() {
//       window.location = "comercial.html?modo=venta";
//     });

//     rustico.addEventListener("click", function() {
//       window.location = "rustico.html?modo=venta";
//     });

//     terreno.addEventListener("click", function() {
//       window.location = "terreno.html?modo=venta";
//     });

//     window.onscroll = function() {
//       "use strict";
//       if (
//         document.body.scrollTop >= 20 ||
//         document.documentElement.scrollTop >= 20
//       ) {
//         topShadow.classList.add("scroll");
//       } else {
//         topShadow.classList.remove("scroll");
//       }
//     };

//     dbRef.on("child_added", function(snapshot) {
//       let articulo = document.createElement("article");
//       let casa = snapshot.val();
//       let key = snapshot.key;

//       articulo.setAttribute("id", key);

//       let descripcion;
//       let descripcionCorta;

//       if (casa.descripcion !== undefined && casa.descripcion !== "") {
//         descripcion = casa.descripcion;
//         descripcionCorta = descripcion.substring(0, 40) + "...";
//       }

//       let precio = "$" + casa.precio.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//       var contenido = `
//       <div id="contenedor-img${key}" style="height: 200px;"></div>
//       <div class="contenedor-inmueble clearfix">
//         <span id="contenedor-porfile-img${key}"></span>
//         <div class="nombre-descripcion">
//           <p class="nombre">${casa.usuarioPoseedor}</p>
//           <p>${descripcionCorta}</p>
//         </div>
//       </div>
//       <div class="fracc-precio">
//         <div class="fraccionamiento-contenedor">
//           <i class="fas fa-map-marker-alt"></i>
//           <p>${casa.fraccionamiento}</p>
//         </div>
//         <p class="precio">${precio}</p>
//       </div>
//       `;

//       articulo.innerHTML = contenido;
//       articulo.addEventListener("click", function() {
//         if (buttonPerfilClicked === false) {
//           var articleId = articulo.getAttribute("id");
//           console.log(articleId);
//           window.location =
//             "infoCompletaPublico.html?id=" + articleId.toString();
//         } else {
//           buttonPerfilClicked = false;
//         }
//       });

//       document.getElementById("main").appendChild(articulo);

//       let imgCasa = document.createElement("img");

//       storage
//         .child(casa.userId + casa.id + "1")
//         .getDownloadURL()
//         .then(function(url) {
//           imgCasa.src = url;
//           document.getElementById("contenedor-img" + key).appendChild(imgCasa);
//         })
//         .catch(function(error) {
//           imgCasa.src = "img/image_off.png";
//           document.getElementById("contenedor-img" + key).appendChild(imgCasa);
//         });

//       let numeroUsuario;

//       if (casa.numeroUsuario !== undefined && casa.numeroUsuario !== "") {
//         if (casa.numeroUsuario.substring(0, 1) === "5") {
//           numeroUsuario = casa.numeroUsuario.substring(
//             3,
//             casa.numeroUsuario.length
//           );
//         } else if (casa.numeroUsuario.substring(0, 1) === "1") {
//           numeroUsuario = casa.numeroUsuario.substring(
//             1,
//             casa.numeroUsuario.length
//           );
//         }
//       }

//       let imagenPerfil = document.createElement("img");
//       imagenPerfil.addEventListener("click", function() {
//         buttonPerfilClicked = true;
//         Swal.fire({
//           title: "Contacto",
//           html: `<p id="numWhatsApp"><b>Número Telefónico:</b> ${numeroUsuario}<p>
//                  <a href="mailto:${
//                    casa.correoUsuario
//                  }" class = "enviar-email"><b>Correo Electrónico: </b>${
//             casa.correoUsuario
//           }</a>`,
//           showCloseButton: true,
//           showConfirmButton: false
//         });

//         let numWhatsApp = document.getElementById("numWhatsApp");
//         numWhatsApp.addEventListener("click", function() {
//           require("electron").shell.openExternal(
//             "https://api.whatsapp.com/send?phone=" + casa.numeroUsuario
//           );
//         });
//       });

//       storagePorfile
//         .child(casa.userId + "profilePicture")
//         .getDownloadURL()
//         .then(function(url) {
//           imagenPerfil.src = url;
//           document
//             .getElementById("contenedor-porfile-img" + key)
//             .appendChild(imagenPerfil);
//         })
//         .catch(function(error) {
//           imagenPerfil.src = "img/account_circle_grey.png";
//           document
//             .getElementById("contenedor-porfile-img" + key)
//             .appendChild(imagenPerfil);
//         });
//     });
//   });
// })();

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

const Swal = require("sweetalert2");
let remote = require("electron").remote;
// let session = remote.session;
const cookies = remote.session.defaultSession.cookies;
// console.log(session.defaultSession.cookies);
// var ar = ["dummy"];
// JSON.stringify(ar);
// var cookie = {
//   url: "http://www.github.com",
//   name: "dummy_name",
//   value: JSON.stringify(ar)
// };
// cookies.set(cookie, error => {
//   if (error) console.error(error);
// });

// cookies.remove("http://www.github.com", "", function() {
//   console.log("Cookie eliminada");
// });

// var func = cookies.get({ name: "dummy_name" }, (error, cookies) => {
//   console.log(error, cookies);
//   var arjson = cookies[0].value;
//   console.log(arjson);
//   console.log(JSON.parse(arjson));
//   // JSON.parse(JSON.stringify(arjson));
//   // console.log(arjson);

//   return cookies;
// });
// console.log(JSON.parse(ar));
// console.log(JSON.parse(ar));
// console.log(func);
// console.log(buscarCookie(dummy_name));

let buttonPerfilClicked = false;

var urlcookies = "http://www.github.com";
var matrizItems = [new Array()];
var matrizFiltro = [new Array()];
var arregloimg = [];
var habitacional = [new Array()];
var comercial = [new Array()];
var rustico = [new Array()];
var terreno = [new Array()];
var rango = [];
var subcat = "all";
var contItems = 0;
var contFilasMI = 0;
var contFilasMF = 0;
var contFilasH = 0;
var contFilasC = 0;
var contFilasR = 0;
var contFilasT = 0;
var paginaActual = 0;
var itemsPaginado = "T";
var placeholder = document.getElementById("placeholder");

// Promise.all([
//   bCo("itemspag"),
//   bCo("filtro"),
//   bCo("imagenes"),
//   bCo("items"),
//   bCo("range"),
//   bCo("rb"),
//   bCo("dato"),
//   bCo("actpage")
// ]).then(function() {
//   console.log("ha terminado");
// });

function eliminarCookies() {
  cookies.remove(urlcookies, "itemspagR", function() {});
  cookies.remove(urlcookies, "filtroR", function() {});
  cookies.remove(urlcookies, "imagenesR", function() {});
  cookies.remove(urlcookies, "itemsR", function() {});
  cookies.remove(urlcookies, "rangeR", function() {});
  cookies.remove(urlcookies, "rbR", function() {});
  cookies.remove(urlcookies, "datoR", function() {});
  cookies.remove(urlcookies, "actpageR", function() {});
}

// function buscarCookie(nombre) {
//   return new Promise((resolve, reject) => {
//     cookies.get({ name: nombre }, (error, cookies) => {
//       // console.log(error, cookies);
//       if (error) reject(error);
//       if (cookies[0] != undefined) {
//         // arreglo.push(cookies[0].value);
//         resolve(cookies[0].value);
//       } else {
//         // arreglo.push(false);
//         resolve(false);
//       }
//       // resolve(arreglo);
//     });
//   });
// }

function buscarCookie(nombre, arreglo) {
  return new Promise((resolve, reject) => {
    cookies.get({ name: nombre }, (error, cookies) => {
      // console.log(error, cookies);
      if (error) reject(error);
      if (cookies[0] != undefined) {
        arreglo.push(cookies[0].value);
        // resolve(cookies[0].value);
      } else {
        arreglo.push(false);
        // resolve(false);
      }
      resolve(arreglo);
    });
  });
}
function setCookie(nombre, valor) {
  cookies.set({ url: urlcookies, name: nombre, value: valor }, error => {
    if (error) console.error(`${error} ,${nombre}, ${valor}`);
    // console.log();
  });
}

(function() {
  "use strict";

  document.addEventListener("DOMContentLoaded", function() {
    var config = {
      apiKey: "AIzaSyBYJJPXZGJYJgNdZIaIAXZZ0DE-3DsfSYw",
      authDomain: "inmobiliariasmx.firebaseapp.com",
      databaseURL: "https://inmobiliariasmx.firebaseio.com",
      projectId: "inmobiliariasmx",
      storageBucket: "inmobiliariasmx.appspot.com",
      messagingSenderId: "374273595319"
    };

    firebase.initializeApp(config);

    let dbRef = firebase.database().ref("Oferta/Aguascalientes");
    let storageProfile = firebase.storage().ref("/profile_pictures");
    var storage = firebase.storage().ref("/fotos");

    var topShadow = document.getElementById("top-bar");

    // let imgPerfil = document.getElementById("imgPerfil");
    // let contitems = 0;

    let hab = document.getElementById("habitacional");
    let com = document.getElementById("comercial");
    let rus = document.getElementById("rustico");
    let ter = document.getElementById("terreno");

    hab.addEventListener("click", function() {
      // window.location = "habitacional.html?modo=venta";
      subcat = "habitacional";
      filtrarElementos(subcat);
      hab.style.color = "#5073B2";
      com.style.color = "#000";
      rus.style.color = "#000";
      ter.style.color = "#000";
    });

    com.addEventListener("click", function() {
      // window.location = "comercial.html?modo=venta";
      subcat = "comercial";
      filtrarElementos(subcat);
      com.style.color = "#5073B2";
      hab.style.color = "#000";
      rus.style.color = "#000";
      ter.style.color = "#000";
    });

    rus.addEventListener("click", function() {
      // window.location = "rustico.html?modo=venta";
      subcat = "rustico";
      filtrarElementos(subcat);
      rus.style.color = "#5073B2";
      hab.style.color = "#000";
      com.style.color = "#000";
      ter.style.color = "#000";
    });

    ter.addEventListener("click", function() {
      // window.location = "terreno.html?modo=venta";
      subcat = "terreno";
      filtrarElementos(subcat);
      ter.style.color = "#5073B2";
      hab.style.color = "#000";
      com.style.color = "#000";
      rus.style.color = "#000";
    });

    window.onscroll = function() {
      "use strict";
      if (
        document.body.scrollTop >= 20 ||
        document.documentElement.scrollTop >= 20
      ) {
        topShadow.classList.add("scroll");
      } else {
        topShadow.classList.remove("scroll");
      }
    };

    buscarCookie("itemspagR", [])
      .then(val => {
        return buscarCookie("filtroR", val);
      })
      .then(val => {
        return buscarCookie("imagenesR", val);
      })
      .then(val => {
        return buscarCookie("itemsR", val);
      })
      .then(val => {
        return buscarCookie("rangeR", val);
      })
      .then(val => {
        return buscarCookie("rbR", val);
      })
      .then(val => {
        return buscarCookie("datoR", val);
      })
      .then(val => {
        return buscarCookie("actpageR", val);
      })
      .then(val => {
        // Promise.all([
        //   buscarCookie("itemspag"),
        //   buscarCookie("filtro"),
        //   buscarCookie("imagenes"),
        //   buscarCookie("items"),
        //   buscarCookie("range"),
        //   buscarCookie("rb"),
        //   buscarCookie("dato"),
        //   buscarCookie("actpage")
        // ]).then(val => {
        // console.log("ha terminado de nuevo");
        // console.log(val);
        // Orden del arreglo de datos
        // ["itemspag","filtro","imagenes","items,"range","rb","dato","actpage"]
        if (val[0] != false && val[0] == "F") {
          // console.log("Hay cookies aqui");
          // console.log(val);
          // arregloimg = JSON.parse(localStorage.getItem("imagenes"));
          arregloimg = JSON.parse(val[2]);
          // matrizItems = JSON.parse(localStorage.getItem("all_items"));

          // matrizFiltro = JSON.parse(localStorage.getItem("items"));
          matrizFiltro = JSON.parse(val[3]);

          // paginaActual = JSON.parse(localStorage.getItem("actpage"));
          paginaActual = JSON.parse(val[7]);

          var sel = document.getElementById("tipo");
          for (var i = 0; i < sel.children.length; i++) {
            // if (localStorage.getItem("filtro") == sel.children[i].value)
            //   sel.children[i].selected = true;
            if (val[1] == sel.children[i].value)
              sel.children[i].selected = true;
          }

          // if (localStorage.getItem("filtro") == "precio") {
          if (val[1] == "precio") {
            // document.getElementById("IF").disabled = true;
            // if (JSON.parse(localStorage.getItem("range"))) {
            if (JSON.parse(val[4]) != false) {
              // rango = JSON.parse(localStorage.getItem("range"));
              rango = JSON.parse(val[4]);
              if (rango[0] == rango[1]) {
                document.getElementById("IF").value = rango[0];
              } else {
                document.getElementById("minimo").value = rango[0];
                document.getElementById("maximo").value = rango[1];
              }

              var min = document.getElementById("precio_min");
              var max = document.getElementById("precio_max");
              min.style.display = "block";
              max.style.display = "block";

              // console.log("" + rango[0] + "," + rango[1] + "");
              // document.getElementById("minimo").value = rango[0];
              // document.getElementById("maximo").value = rango[1];
              // $(".range-slider").jRange(
              //   "setValue",
              //   "" + rango[0] + "," + rango[1] + ""
              // );
            }
            // document.getElementById("contenedor_slider").style.display = "block";
            // } else if (localStorage.getItem("filtro") == "amueblada") {
          } else if (val[1] == "amueblada") {
            document.getElementById("IF").disabled = true;
            document.getElementById("contenedor_slider").style.display = "none";
            // if (localStorage.getItem("rb")) {
            if (val[5] != false) {
              var rb = document.getElementById("rdbtn");
              for (i = 0; i < rb.length; i++) {
                // console.log(localStorage.getItem("rb"));
                // if (localStorage.getItem("rb") == rb[i].value) {
                if (val[5] == rb[i].value) {
                  rb[i].checked = true;
                  // console.log(rb[i].value);
                }
              }
              // JSON.parse(localStorage.getItem("rb")).checked = true;
              // document.getElementById("rdbtn").style.display = "block";
            }
            document.getElementById("rdbtn").style.display = "block";
          } else {
            // document.getElementById("IF").disabled = false;
            // document.getElementById("rdbtn").style.display = "none";
            var min = document.getElementById("precio_min");
            var max = document.getElementById("precio_max");
            min.style.display = "none";
            max.style.display = "none";
          }

          // itemsPaginado = localStorage.getItem("itemspag");
          itemsPaginado = val[0];

          // document.getElementById("IF").value = localStorage.getItem("dato");
          document.getElementById("IF").value = val[6];

          // console.log("pag: " + paginaActual);
          // console.log(matrizFiltro);
          // detenerLoader();
          mostrarPagina(paginaActual, matrizFiltro);
        } else {
          eliminarCookies();
        }
      });

    // if (
    //   localStorage.getItem("itemspag") &&
    //   localStorage.getItem("filtro") == "Sin Filtro" &&
    //   localStorage.getItem("itemspag") == "F"
    // ) {
    //   arregloimg = JSON.parse(localStorage.getItem("imagenes"));
    //   // matrizItems = JSON.parse(localStorage.getItem("all_items"));
    //   matrizFiltro = JSON.parse(localStorage.getItem("items"));
    //   paginaActual = JSON.parse(localStorage.getItem("actpage"));
    //   var sel = document.getElementById("tipo");
    //   for (var i = 0; i < sel.children.length; i++) {
    //     if (localStorage.getItem("filtro") == sel.children[i].value)
    //       sel.children[i].selected = true;
    //   }

    //   if (localStorage.getItem("filtro") == "precio") {
    //     document.getElementById("IF").disabled = true;
    //     if (JSON.parse(localStorage.getItem("range"))) {
    //       rango = JSON.parse(localStorage.getItem("range"));
    //       // console.log("" + rango[0] + "," + rango[1] + "");
    //       document.getElementById("minimo").value = rango[0];
    //       document.getElementById("maximo").value = rango[1];
    //       // $(".range-slider").jRange(
    //       //   "setValue",
    //       //   "" + rango[0] + "," + rango[1] + ""
    //       // );
    //     }
    //     // document.getElementById("contenedor_slider").style.display = "block";
    //   } else if (localStorage.getItem("filtro") == "amueblada") {
    //     document.getElementById("IF").disabled = true;
    //     document.getElementById("contenedor_slider").style.display = "none";
    //     if (localStorage.getItem("rb")) {
    //       var rb = document.getElementById("rdbtn");
    //       for (i = 0; i < rb.length; i++) {
    //         console.log(localStorage.getItem("rb"));
    //         if (localStorage.getItem("rb") == rb[i].value) {
    //           rb[i].checked = true;
    //           console.log(rb[i].value);
    //         }
    //       }
    //       // JSON.parse(localStorage.getItem("rb")).checked = true;
    //       // document.getElementById("rdbtn").style.display = "block";
    //     }
    //     document.getElementById("rdbtn").style.display = "block";
    //   } else {
    //     document.getElementById("IF").disabled = false;
    //     // document.getElementById("rdbtn").style.display = "none";
    //   }

    //   itemsPaginado = localStorage.getItem("itemspag");
    //   document.getElementById("IF").value = localStorage.getItem("dato");
    //   console.log("pag: " + paginaActual);
    //   console.log(matrizFiltro);
    //   // detenerLoader();
    //   mostrarPagina(paginaActual, matrizFiltro);
    // } else {
    // localStorage.clear();
    // eliminarCookies();
    //   // mostrarInicio();
    // }

    dbRef
      .orderByChild("estado")
      .equalTo("Renta")
      .on("child_added", function(snapshot) {
        // let articulo = document.createElement("article");
        let casa = snapshot.val();
        let key = snapshot.key;

        // console.log("hola");
        // obtenerUrl(casa, storage).then(function(url) {

        // }
        obtenerUrlCasa(casa).then(function(image) {
          var img = image;
          // console.log(img);
          obtenerUrlProfile(casa).then(function(profile) {
            // console.log(url);
            // var src = url;
            var prof = profile;
            // console.log(profile);
            arregloimg.push({ id: casa.id, image: img, profile: prof });
            // newImg.src = url;
            // arregloimg.push({ id: casa.id, url: img });
            // localStorage.setItem("imagenes", JSON.stringify(arregloimg));

            // if (contitems < 15) {
            // document.getElementById("main").appendChild(articulo);
            // crearItem(casa, "");
            // console.log(img);
            // crearItem(casa, image, profile);
            // }
            buscarCookie("itemspagR", []).then(val => {
              if (contFilasMI < 15) {
                // if (contItems < 15 && !localStorage.getItem("itemspag")) {
                if (contItems < 15 && val[0] == false) {
                  // objeto = {
                  //   item:
                  // crearItem(casa, url, "");
                  // console.log("hola");
                  crearItem(casa, image, profile);
                  //   datos: casa
                  // };
                  // crearItem(casa, img, "");
                  contItems++;
                } else {
                  // detenerLoader();
                  detenerAnimacion();

                  // if (document.getElementById("placeholder")) {
                  // document.getElementById("main").removeChild(placeholder);
                  // document.getElementById("placeholder").innerHTML = "";
                  // }
                }
              } else {
                matrizItems.push(new Array());
                contFilasMI = 0;
              }
              matrizItems[matrizItems.length - 1].push(casa);
              // localStorage.setItem("all_items", JSON.stringify(matrizItems));
              contFilasMI++;
            });
          });
        });

        switch (casa.tipo) {
          case "habitacional":
            if (contFilasH == 15) {
              habitacional.push(new Array());
              contFilasH = 0;
            }
            var obj_filtro = {
              id: casa.id,
              fraccionamiento: casa.fraccionamiento,
              precio: casa.precio,
              correoUsuario: casa.correoUsuario,
              numeroUsuario: casa.numeroUsuario,
              usuarioPoseedor: casa.usuarioPoseedor
              // descripcion: casa.descripcion
              /* ,
              image: buscarImagen(casa).image,
              profile: buscarImagen(casa).profile */
            };

            // habitacional[habitacional.length - 1].push(casa);
            habitacional[habitacional.length - 1].push(obj_filtro);
            // sessionStorage.setItem("all_items", JSON.stringify(matrizItems));
            contFilasH++;
            break;
          case "comercial":
            if (contFilasC == 15) {
              comercial.push(new Array());
              contFilasC = 0;
            }

            var obj_filtro = {
              id: casa.id,
              fraccionamiento: casa.fraccionamiento,
              precio: casa.precio,
              correoUsuario: casa.correoUsuario,
              numeroUsuario: casa.numeroUsuario,
              usuarioPoseedor: casa.usuarioPoseedor
              // descripcion: casa.descripcion
              /* ,
              image: buscarImagen(casa).image,
              profile: buscarImagen(casa).profile */
            };

            comercial[comercial.length - 1].push(obj_filtro);
            // sessionStorage.setItem("all_items", JSON.stringify(matrizItems));
            contFilasC++;
            break;
          case "rustico":
            if (contFilasR == 15) {
              rustico.push(new Array());
              contFilasR = 0;
            }

            var obj_filtro = {
              id: casa.id,
              fraccionamiento: casa.fraccionamiento,
              precio: casa.precio,
              correoUsuario: casa.correoUsuario,
              numeroUsuario: casa.numeroUsuario,
              usuarioPoseedor: casa.usuarioPoseedor
              // descripcion: casa.descripcion
              /* ,
              image: buscarImagen(casa).image,
              profile: buscarImagen(casa).profile */
            };

            rustico[rustico.length - 1].push(obj_filtro);
            // sessionStorage.setItem("all_items", JSON.stringify(matrizItems));
            contFilasR++;
            break;
          case "terreno":
            if (contFilasT == 15) {
              terreno.push(new Array());
              contFilasT = 0;
            }

            var obj_filtro = {
              id: casa.id,
              fraccionamiento: casa.fraccionamiento,
              precio: casa.precio,
              correoUsuario: casa.correoUsuario,
              numeroUsuario: casa.numeroUsuario,
              usuarioPoseedor: casa.usuarioPoseedor
              // descripcion: casa.descripcion
              /* ,
              image: buscarImagen(casa).image,
              profile: buscarImagen(casa).profile */
            };

            terreno[terreno.length - 1].push(obj_filtro);
            // sessionStorage.setItem("all_items", JSON.stringify(matrizItems));
            contFilasT++;
            break;
        }
        // articulo.setAttribute("id", key);

        // let descripcion;
        // let descripcionCorta;

        // if (casa.descripcion !== undefined && casa.descripcion !== "") {
        //   descripcion = casa.descripcion;
        //   descripcionCorta = descripcion.substring(0, 40) + "...";
        // }

        // let precio = "$" + casa.precio.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        // var contenido = `
        // <div id="contenedor-img${key}" style="height: 200px;"></div>
        // <div class="contenedor-inmueble clearfix">
        //   <span id="contenedor-porfile-img${key}"></span>
        //   <div class="nombre-descripcion">
        //     <p class="nombre">${casa.usuarioPoseedor}</p>
        //     <p>${descripcionCorta}</p>
        //   </div>
        // </div>
        // <div class="fracc-precio">
        //   <div class="fraccionamiento-contenedor">
        //     <i class="fas fa-map-marker-alt"></i>
        //     <p>${casa.fraccionamiento}</p>
        //   </div>
        //   <p class="precio">${precio}</p>
        // </div>
        // `;

        // articulo.innerHTML = contenido;
        // articulo.addEventListener("click", function() {
        //   if (buttonPerfilClicked === false) {
        //     var articleId = articulo.getAttribute("id");
        //     console.log(articleId);
        //     window.location =
        //       "infoCompletaPublico.html?id=" + articleId.toString();
        //   } else {
        //     buttonPerfilClicked = false;
        //   }
        // });

        // if (contitems < 15) {
        // document.getElementById("main").appendChild(articulo);
        // crearItem(casa, "");
        // console.log(img);
        // }

        // let imgCasa = document.createElement("img");

        // storage
        //   .child(casa.userId + casa.id + "1")
        //   .getDownloadURL()
        //   .then(function(url) {
        //     imgCasa.src = url;
        //     document.getElementById("contenedor-img" + key).appendChild(imgCasa);
        //   })
        //   .catch(function(error) {
        //     imgCasa.src = "img/image_off.png";
        //     document.getElementById("contenedor-img" + key).appendChild(imgCasa);
        //   });

        // let numeroUsuario;

        // if (casa.numeroUsuario !== undefined && casa.numeroUsuario !== "") {
        //   if (casa.numeroUsuario.substring(0, 1) === "5") {
        //     numeroUsuario = casa.numeroUsuario.substring(
        //       3,
        //       casa.numeroUsuario.length
        //     );
        //   } else if (casa.numeroUsuario.substring(0, 1) === "1") {
        //     numeroUsuario = casa.numeroUsuario.substring(
        //       1,
        //       casa.numeroUsuario.length
        //     );
        //   }
        // }

        // let imagenPerfil = document.createElement("img");
        // imagenPerfil.addEventListener("click", function() {
        //   buttonPerfilClicked = true;
        //   Swal.fire({
        //     title: "Contacto",
        //     html: `<p id="numWhatsApp"><b>Número Telefónico:</b> ${numeroUsuario}<p>
        //            <a href="mailto:${
        //              casa.correoUsuario
        //            }" class = "enviar-email"><b>Correo Electrónico: </b>${
        //       casa.correoUsuario
        //     }</a>`,
        //     showCloseButton: true,
        //     showConfirmButton: false
        //   });

        //   let numWhatsApp = document.getElementById("numWhatsApp");
        //   numWhatsApp.addEventListener("click", function() {
        //     require("electron").shell.openExternal(
        //       "https://api.whatsapp.com/send?phone=" + casa.numeroUsuario
        //     );
        //   });
        // });

        // storageProfile
        //   .child(casa.userId + "profilePicture")
        //   .getDownloadURL()
        //   .then(function(url) {
        //     imagenPerfil.src = url;
        //     document
        //       .getElementById("contenedor-porfile-img" + key)
        //       .appendChild(imagenPerfil);
        //   })
        //   .catch(function(error) {
        //     imagenPerfil.src = "img/account_circle_grey.png";
        //     document
        //       .getElementById("contenedor-porfile-img" + key)
        //       .appendChild(imagenPerfil);
        //   });

        // contitems++;
      });

    function crearItem(casa, img, perfil) {
      let articulo = document.createElement("article");

      articulo.setAttribute("id", casa.id);

      let descripcion;
      let descripcionCorta;

      if (casa.descripcion !== undefined && casa.descripcion !== "") {
        descripcion = casa.descripcion;
        descripcionCorta = descripcion.substring(0, 40) + "...";
      }

      let precio = "$" + casa.precio.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let numeroUsuario;

      if (casa.numeroUsuario !== undefined && casa.numeroUsuario !== "") {
        if (casa.numeroUsuario.substring(0, 1) === "5") {
          numeroUsuario = casa.numeroUsuario.substring(
            3,
            casa.numeroUsuario.length
          );
        } else if (casa.numeroUsuario.substring(0, 1) === "1") {
          numeroUsuario = casa.numeroUsuario.substring(
            1,
            casa.numeroUsuario.length
          );
        }
      }

      var contenido = `
      <div id="contenedor-img${casa.id}" style="height: 200px;">
      <img src="${img}">
      </div>
      <div class="contenedor-inmueble clearfix">
        <span id="contenedor-porfile-img${casa.id}">
        <img src="${perfil}">
        </span>
        <div class="nombre-descripcion">
          <p class="nombre">${casa.usuarioPoseedor}</p>
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
      articulo.addEventListener("click", function() {
        if (buttonPerfilClicked === false) {
          var articleId = articulo.getAttribute("id");
          // console.log(articleId);
          window.location =
            "infoCompletaPublico.html?id=" + articleId.toString();
        } else {
          buttonPerfilClicked = false;
        }
      });

      let imgCasa = document.createElement("img");

      // storage
      //   .child(casa.userId + casa.id + "1")
      //   .getDownloadURL()
      //   .then(function(url) {
      //     imgCasa.src = url;
      // imgCasa.src = img;
      //   document.getElementById("contenedor-img" + key).appendChild(imgCasa);
      // })
      // .catch(function(error) {
      //   imgCasa.src = "img/image_off.png";
      //   document
      //     .getElementById("contenedor-img" + casa.id)
      //     .appendChild(imgCasa);
      // });

      // let numeroUsuario;

      // if (casa.numeroUsuario !== undefined && casa.numeroUsuario !== "") {
      //   if (casa.numeroUsuario.substring(0, 1) === "5") {
      //     numeroUsuario = casa.numeroUsuario.substring(
      //       3,
      //       casa.numeroUsuario.length
      //     );
      //   } else if (casa.numeroUsuario.substring(0, 1) === "1") {
      //     numeroUsuario = casa.numeroUsuario.substring(
      //       1,
      //       casa.numeroUsuario.length
      //     );
      //   }
      // }

      // let imagenPerfil = document.createElement("img");
      // imagenPerfil.addEventListener("click", function() {
      // document
      //   .getElementById(`img${casa.id}`)
      //   .addEventListener("click", function() {
      //     buttonPerfilClicked = true;
      //     Swal.fire({
      //       title: "Contacto",
      //       html: `<p id="numWhatsApp"><b>Número Telefónico:</b> ${numeroUsuario}<p>
      //                <a href="mailto:${
      //                  casa.correoUsuario
      //                }" class = "enviar-email"><b>Correo Electrónico: </b>${
      //         casa.correoUsuario
      //       }</a>`,
      //       showCloseButton: true,
      //       showConfirmButton: false
      //     });

      //     let numWhatsApp = document.getElementById("numWhatsApp");
      //     numWhatsApp.addEventListener("click", function() {
      //       require("electron").shell.openExternal(
      //         "https://api.whatsapp.com/send?phone=" + casa.numeroUsuario
      //       );
      //     });
      //   });

      // storageProfile
      //   .child(casa.userId + "profilePicture")
      //   .getDownloadURL()
      //   .then(function(url) {
      //     imagenPerfil.src = url;
      // imagenPerfil.src = perfil;
      //   document
      //     .getElementById("contenedor-porfile-img" + casa.id)
      //     .appendChild(imagenPerfil);
      // })
      // .catch(function(error) {
      //   imagenPerfil.src = "img/account_circle_grey.png";
      //   document
      //     .getElementById("contenedor-porfile-img" + casa.id)
      //     .appendChild(imagenPerfil);
      // });

      document.getElementById("main").appendChild(articulo);
    }

    // function mostrarContacto(correo, numero) {
    //   let numeroUsuario;
    //
    //   if (numero !== undefined && numero !== "") {
    //     if (numero.substring(0, 1) === "5") {
    //       numeroUsuario = numero.substring(3, numero.length);
    //     } else if (numero.substring(0, 1) === "1") {
    //       numeroUsuario = numero.substring(1, numero.length);
    //     }
    //   }
    //
    //   buttonPerfilClicked = true;
    //   Swal.fire({
    //     title: "Contacto",
    //     html: `<p id="numWhatsApp"><b>Número Telefónico:</b> ${numeroUsuario}<p>
    //              <a href="mailto:${correo}" class = "enviar-email"><b>Correo Electrónico: </b>${correo}</a>`,
    //     showCloseButton: true,
    //     showConfirmButton: false
    //   });
    //
    //   let numWhatsApp = document.getElementById("numWhatsApp");
    //   numWhatsApp.addEventListener("click", function() {
    //     require("electron").shell.openExternal(
    //       "https://api.whatsapp.com/send?phone=" + numero
    //     );
    //   });
    // }

    function obtenerUrlCasa(casa) {
      return storage
        .child(casa.userId + casa.id + "1")
        .getDownloadURL()
        .then(function(url) {
          // imgCasa.src = url;
          // document.getElementById("contenedor-img" + key).appendChild(imgCasa);
          return url;
        })
        .catch(function(error) {
          // imgCasa.src = "img/image_off.png";
          // document.getElementById("contenedor-img" + key).appendChild(imgCasa);
          return "img/image_off.png";
        });
    }

    function obtenerUrlProfile(casa) {
      return storageProfile
        .child(casa.userId + "profilePicture")
        .getDownloadURL()
        .then(function(urlprofile) {
          // imagenPerfil.src = url;
          // document
          //   .getElementById("contenedor-porfile-img" + casa.id)
          //   .appendChild(imagenPerfil);
          return urlprofile;
        })
        .catch(function(error) {
          // imagenPerfil.src = "img/account_circle_grey.png";
          // document
          //   .getElementById("contenedor-porfile-img" + casa.id)
          //   .appendChild(imagenPerfil);
          return "img/account_circle_grey.png";
        });
    }

    function detenerAnimacion() {
      // if (cargando) {
      // document.getElementById("catalogo").removeChild(placeholder);
      document.getElementById("placeholder").innerHTML = "";

      document.getElementById("loader_menu").style.display = "none";
      // document.getElementById("loader_icon").style.display = "none";

      // document.getElementById("menu_icon").classList.remove("hidden");

      document.getElementById("loader_pag").style.display = "none";
      document.getElementById("loader_search").style.display = "none";
      document.getElementById("loader_filtro").style.display = "none";
      // document
      //   .getElementById("banner")
      //   .removeChild(document.getElementById("loader_pag"));

      // document.body.removeChild(document.getElementById("loader_search"));
      document.getElementById("links").classList.remove("hidden");
      document.getElementById("busqueda").classList.remove("hidden");
      document.getElementById("filtros").classList.remove("hidden");

      // document.getElementById("busqueda").style.display = "block";
      // document.getElementById("filtros").style.display = "block";
      document.getElementById("paginado").style.display = "inline-block";

      // cargando = false;
      // }
    }

    // console.log(buscarCookie("dummy_name", function() {}));
    // buscarCookie("dummy_name");

    function buscarImagen(casa) {
      for (var i = 0; i < arregloimg.length; i++) {
        if (arregloimg[i].id == casa.id) {
          return arregloimg[i];
        }
      }
    }

    function filtrarElementos(e) {
      // console.log(habitacional);
      // console.log(comercial);
      // console.log(rustico);
      // console.log(terreno);

      document.getElementById("main").innerHTML = "";
      matrizFiltro = [new Array()];
      document.getElementById("numpag").innerHTML = "1";
      itemsPaginado = "F";
      // localStorage.setItem("itemspag", itemsPaginado);
      // var cookie = {
      //   url: "http://www.github.com",
      //   name: "dummy_name",
      //   value: "dummy"
      // };
      setCookie("itemspagR", itemsPaginado);
      // cookies.set(
      //   { url: urlcookies, name: "itemspag", value: itemsPaginado },
      //   error => {
      //     if (error) console.error(error);
      //   }
      // );
      contFilasMF = 0;
      contItems = 0;
      paginaActual = 0;
      document.getElementById("al").style.color = "rgba(0, 0, 0, 0.26)";
      document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.26)";
      // localStorage.setItem("actpage", JSON.stringify(paginaActual));
      setCookie("actpageR", JSON.stringify(paginaActual));
      // cookies.set(
      //   {
      //     url: urlcookies,
      //     name: "actpage",
      //     value: JSON.stringify(paginaActual)
      //   },
      //   error => {
      //     if (error) console.error(error);
      //   }
      // );
      var dato = document.getElementById("IF").value.toLowerCase();
      var filtro = document.getElementById("tipo").options[
        document.getElementById("tipo").selectedIndex
      ].value;

      if (
        (dato.length == 0 && filtro != "amueblada" && filtro != "precio") ||
        filtro == "Sin Filtro"
      ) {
        filtro = "Todo";
      }

      if (filtro == "precio") {
        // var contenedor = document.getElementById("contenedor_slider");
        // contenedor.style.display = "block";
        // document.getElementById("IF").disabled = true;
        var min = document.getElementById("precio_min");
        var max = document.getElementById("precio_max");
        min.style.display = "block";
        max.style.display = "block";
        // var contenedorrb = document.getElementById("rdbtn");
        // contenedorrb.style.display = "none";
        // } else if (filtro == "amueblada") {
        //   var contenedor = document.getElementById("contenedor_slider");
        //   contenedor.style.display = "none";
        //   var contenedorrb = document.getElementById("rdbtn");
        //   contenedorrb.style.display = "block";
        //   document.getElementById("IF").disabled = true;
        //-- document.getElementById("IF").disabled = false;
      } else {
        // var contenedorrb = document.getElementById("rdbtn");
        // contenedorrb.style.display = "none";
        // var contenedor = document.getElementById("contenedor_slider");
        // contenedor.style.display = "none";
        var min = document.getElementById("precio_min");
        var max = document.getElementById("precio_max");
        min.style.display = "none";
        max.style.display = "none";
        // document.getElementById("IF").disabled = false;
        // document.getElementById("minimo").disabled = true;
        // document.getElementById("maximo").disabled = true;
      }

      // localStorage.setItem("dato", document.getElementById("IF").value);
      setCookie("datoR", document.getElementById("IF").value);
      // cookies.set(
      //   {
      //     url: urlcookies,
      //     name: "dato",
      //     value: document.getElementById("IF").value
      //   },
      //   error => {
      //     if (error) console.error(error);
      //   }
      // );
      // localStorage.setItem(
      //   "filtro",
      //   document.getElementById("tipo").options[
      //     document.getElementById("tipo").selectedIndex
      //   ].value
      // );
      setCookie(
        "filtroR",
        document.getElementById("tipo").options[
          document.getElementById("tipo").selectedIndex
        ].value
      );
      // cookies.set(
      //   {
      //     url: urlcookies,
      //     name: "filtro",
      //     value: document.getElementById("tipo").options[
      //       document.getElementById("tipo").selectedIndex
      //     ].value
      //   },
      //   error => {
      //     if (error) console.error(error);
      //   }
      // );
      // buscarItem(dato, filtro);
      // console.log(matrizFiltro);
      switch (subcat) {
        case "all":
          buscarItem(dato, filtro, matrizItems);
          break;
        case "habitacional":
          buscarItem(dato, filtro, habitacional);
          break;
        case "comercial":
          buscarItem(dato, filtro, comercial);
          break;
        case "rustico":
          buscarItem(dato, filtro, rustico);
          break;
        case "terreno":
          buscarItem(dato, filtro, terreno);
          break;
      }
    }

    document.getElementById("tipo").addEventListener("change", function() {
      filtrarElementos(itemsPaginado);
      // console.log("funciona bien perron");
    });
    document.getElementById("IF").addEventListener("input", function() {
      filtrarElementos(itemsPaginado);
      // console.log("funciona bien perron");
    });
    document.getElementById("minimo").addEventListener("input", function() {
      filtrarElementos(itemsPaginado);
      // console.log("funciona bien perron");
    });
    document.getElementById("maximo").addEventListener("input", function() {
      filtrarElementos(itemsPaginado);
      // console.log("funciona bien perron");
    });

    function buscarItem(dato, filtro, array) {
      // localStorage.setItem("imagenes", JSON.stringify(arregloimg));
      setCookie("imagenesR", JSON.stringify(arregloimg));
      // cookies.set(
      //   {
      //     url: urlcookies,
      //     name: "imagenes",
      //     value: JSON.stringify(arregloimg)
      //   },
      //   error => {
      //     if (error) console.error(error);
      //   }
      // );
      switch (filtro) {
        case "Todo":
          if (subcat == "all") {
            itemsPaginado = "T";
          }
          // localStorage.clear();
          array[0].forEach(casa => {
            crearItem(
              casa,
              buscarImagen(casa).image,
              buscarImagen(casa).profile
            );
            // crearItem(casa, image, profile);

            // document.getElementById("casas").appendChild(casa.item);
          });
          if (paginaActual + 1 >= array.length - 1) {
            document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.26)";
          } else {
            document.getElementById("al").style.color = "rgba(0, 0, 0, 0.26)";
            document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.54)";
          }
          // localStorage.setItem("itemspag", itemsPaginado);
          setCookie("itemspagR", itemsPaginado);
          // if (subcat != "all") {
          matrizFiltro = array;
          setCookie("itemsR", JSON.stringify(array));
          // }

          // setCookie("itemrsV", JSON.stringify(array));
          // cookies.set(
          //   {
          //     url: urlcookies,
          //     name: "itemsV",
          //     value: JSON.stringify(matrizFiltro)
          //   },
          //   error => {
          //     if (error) console.error(error);
          //   }
          // );
          // document.getElementById("al").style.color = "rgba(0, 0, 0, 0.26)";
          // document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.54)";
          break;

        case "precio":
          var precio_exacto = document.getElementById("IF").value;
          var min = document.getElementById("minimo").value;
          var max = document.getElementById("maximo").value;
          if (precio_exacto != "") {
            rango = [precio_exacto, precio_exacto];
          } else {
            rango = [min, max];
          }
          // localStorage.setItem("range", JSON.stringify(rango));
          setCookie("rangeR", JSON.stringify(rango));
          // cookies.set(
          //   { url: urlcookies, name: "range", value: rango },
          //   error => {
          //     if (error) console.error(error);
          //   }
          // );
          for (var i = 0; i < array.length; i++) {
            array[i].forEach(casa => {
              // if (casa.precio.toLowerCase().indexOf(dato) == 0) {
              if (
                casa.precio >= parseInt(rango[0]) &&
                casa.precio <= parseInt(rango[1])
              ) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {
                    // crearItem(casa, buscarImagen(casa), "");
                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );
                    // console.log(casa);
                    // document.getElementById("casas").appendChild(casa.item);
                    contItems++;
                  }
                } else {
                  document.getElementById("ar").style.color =
                    "rgba(0, 0, 0, 0.54)";
                  matrizFiltro.push(new Array());
                  contFilasMF = 0;
                }

                var obj_filtro = {
                  id: casa.id,
                  fraccionamiento: casa.fraccionamiento,
                  precio: casa.precio,
                  correoUsuario: casa.correoUsuario,
                  numeroUsuario: casa.numeroUsuario,
                  usuarioPoseedor:
                    casa.usuarioPoseedor /* ,
                  descripcion: casa.descripcion */
                  /* ,
                  image: buscarImagen(casa).image,
                  profile: buscarImagen(casa).profile */
                };

                // matrizFiltro[matrizFiltro.length - 1].push(casa);
                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);
                // localStorage.setItem("items", JSON.stringify(matrizFiltro));
                setCookie("itemsR", JSON.stringify(matrizFiltro));
                // cookies.set(
                //   { url: urlcookies, name: "items", value: matrizFiltro },
                //   error => {
                //     if (error) console.error(error);
                //   }
                // );
                // itemsPaginado = matrizFiltro;
                contFilasMF++;
              }
              // console.log(matrizFiltro);
              // console.log(contFilasMF);
            });
          }
          break;

        case "fraccionamiento":
          for (var i = 0; i < array.length; i++) {
            array[i].forEach(casa => {
              if (casa.fraccionamiento.toLowerCase().indexOf(dato) == 0) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {
                    // crearItem(casa, buscarImagen(casa), "");
                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );
                    // document.getElementById("casas").appendChild(casa.item);
                    // console.log(casa.item);
                    contItems++;
                  }
                } else {
                  document.getElementById("ar").style.color =
                    "rgba(0, 0, 0, 0.54)";
                  matrizFiltro.push(new Array());
                  contFilasMF = 0;
                }

                var obj_filtro = {
                  id: casa.id,
                  fraccionamiento: casa.fraccionamiento,
                  precio: casa.precio,
                  correoUsuario: casa.correoUsuario,
                  numeroUsuario: casa.numeroUsuario,
                  usuarioPoseedor:
                    casa.usuarioPoseedor /* ,
                  descripcion: casa.descripcion */
                  /* ,
                  image: buscarImagen(casa).image,
                  profile: buscarImagen(casa).profile */
                };

                // matrizFiltro[matrizFiltro.length - 1].push(casa);
                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);
                // localStorage.setItem("items", JSON.stringify(matrizFiltro));
                setCookie("itemsR", JSON.stringify(matrizFiltro));
                // cookies.set(
                //   { url: urlcookies, name: "items", value: matrizFiltro },
                //   error => {
                //     if (error) console.error(error);
                //   }
                // );
                // itemsPaginado = matrizFiltro;
                contFilasMF++;
              }
              // console.log(matrizFiltro);
              // console.log(contFilasMF);
            });
          }
          break;

        case "plantas":
          for (var i = 0; i < array.length; i++) {
            array[i].forEach(casa => {
              if (casa.nPlantas == dato.trim()) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {
                    // crearItem(casa, buscarImagen(casa), "");
                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );
                    // document.getElementById("casas").appendChild(casa.item);
                    // console.log(casa.item);
                    contItems++;
                  }
                } else {
                  document.getElementById("ar").style.color =
                    "rgba(0, 0, 0, 0.54)";
                  matrizFiltro.push(new Array());
                  contFilasMF = 0;
                }

                var obj_filtro = {
                  id: casa.id,
                  fraccionamiento: casa.fraccionamiento,
                  precio: casa.precio,
                  correoUsuario: casa.correoUsuario,
                  numeroUsuario: casa.numeroUsuario,
                  usuarioPoseedor:
                    casa.usuarioPoseedor /* ,
                  descripcion: casa.descripcion */
                  /* ,
                  image: buscarImagen(casa).image,
                  profile: buscarImagen(casa).profile */
                };

                // matrizFiltro[matrizFiltro.length - 1].push(casa);
                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);
                // localStorage.setItem("items", JSON.stringify(matrizFiltro));
                setCookie("itemsR", JSON.stringify(matrizFiltro));
                // cookies.set(
                //   { url: urlcookies, name: "items", value: matrizFiltro },
                //   error => {
                //     if (error) console.error(error);
                //   }
                // );
                // itemsPaginado = matrizFiltro;
                contFilasMF++;
              }
            });
            // console.log(matrizFiltro);
            // console.log(contFilasMF);
          }
          break;

        case "recamaras":
          for (var i = 0; i < array.length; i++) {
            array[i].forEach(casa => {
              if (casa.numRecamaras == dato.trim()) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {
                    // crearItem(casa, buscarImagen(casa), "");
                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );
                    // document.getElementById("casas").appendChild(casa.item);
                    // console.log(casa.item);
                    contItems++;
                  }
                } else {
                  document.getElementById("ar").style.color =
                    "rgba(0, 0, 0, 0.54)";
                  matrizFiltro.push(new Array());
                  contFilasMF = 0;
                }

                var obj_filtro = {
                  id: casa.id,
                  fraccionamiento: casa.fraccionamiento,
                  precio: casa.precio,
                  correoUsuario: casa.correoUsuario,
                  numeroUsuario: casa.numeroUsuario,
                  usuarioPoseedor:
                    casa.usuarioPoseedor /* ,
                  descripcion: casa.descripcion */
                  /* ,
                  image: buscarImagen(casa).image,
                  profile: buscarImagen(casa).profile */
                };

                // matrizFiltro[matrizFiltro.length - 1].push(casa);
                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);
                // localStorage.setItem("items", JSON.stringify(matrizFiltro));
                setCookie("itemsR", JSON.stringify(matrizFiltro));
                // cookies.set(
                //   { url: urlcookies, name: "items", value: matrizFiltro },
                //   error => {
                //     if (error) console.error(error);
                //   }
                // );
                // itemsPaginado = matrizFiltro;
                contFilasMF++;
              }
            });
            // console.log(matrizFiltro);
            // console.log(contFilasMF);
          }
          break;
        case "banios":
          for (var i = 0; i < array.length; i++) {
            array[i].forEach(casa => {
              if (casa.numBanios == dato.trim()) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {
                    // crearItem(casa, buscarImagen(casa), "");
                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );
                    // document.getElementById("casas").appendChild(casa.item);
                    // console.log(casa.item);
                    contItems++;
                  }
                } else {
                  document.getElementById("ar").style.color =
                    "rgba(0, 0, 0, 0.54)";
                  matrizFiltro.push(new Array());
                  contFilasMF = 0;
                }

                var obj_filtro = {
                  id: casa.id,
                  fraccionamiento: casa.fraccionamiento,
                  precio: casa.precio,
                  correoUsuario: casa.correoUsuario,
                  numeroUsuario: casa.numeroUsuario,
                  usuarioPoseedor:
                    casa.usuarioPoseedor /* ,
                  descripcion: casa.descripcion */
                  /* ,
                  image: buscarImagen(casa).image,
                  profile: buscarImagen(casa).profile */
                };

                // matrizFiltro[matrizFiltro.length - 1].push(casa);
                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);
                // localStorage.setItem("items", JSON.stringify(matrizFiltro));
                setCookie("itemsR", JSON.stringify(matrizFiltro));
                // cookies.set(
                //   { url: urlcookies, name: "items", value: matrizFiltro },
                //   error => {
                //     if (error) console.error(error);
                //   }
                // );
                // itemsPaginado = matrizFiltro;
                contFilasMF++;
              }
            });
          }
          break;

        case "terreno":
          for (var i = 0; i < array.length; i++) {
            array[i].forEach(casa => {
              if (casa.supTerreno == dato.trim()) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {
                    // crearItem(casa, buscarImagen(casa), "");
                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );
                    // document.getElementById("casas").appendChild(casa.item);
                    // console.log(casa.item);
                    contItems++;
                  }
                } else {
                  document.getElementById("ar").style.color =
                    "rgba(0, 0, 0, 0.54)";
                  matrizFiltro.push(new Array());
                  contFilasMF = 0;
                }

                var obj_filtro = {
                  id: casa.id,
                  fraccionamiento: casa.fraccionamiento,
                  precio: casa.precio,
                  correoUsuario: casa.correoUsuario,
                  numeroUsuario: casa.numeroUsuario,
                  usuarioPoseedor:
                    casa.usuarioPoseedor /* ,
                  descripcion: casa.descripcion */
                  /* ,
                  image: buscarImagen(casa).image,
                  profile: buscarImagen(casa).profile */
                };

                // matrizFiltro[matrizFiltro.length - 1].push(casa);
                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);
                // localStorage.setItem("items", JSON.stringify(matrizFiltro));
                setCookie("itemsR", JSON.stringify(matrizFiltro));
                // cookies.set(
                //   { url: urlcookies, name: "items", value: matrizFiltro },
                //   error => {
                //     if (error) console.error(error);
                //   }
                // );
                // itemsPaginado = matrizFiltro;
                contFilasMF++;
              }
            });
          }
          break;

        case "construccion":
          for (var i = 0; i < array.length; i++) {
            array[i].forEach(casa => {
              if (casa.supConstruccion == dato.trim()) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {
                    // crearItem(casa, buscarImagen(casa), "");
                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );
                    // document.getElementById("casas").appendChild(casa.item);
                    // console.log(casa.item);
                    contItems++;
                  }
                } else {
                  document.getElementById("ar").style.color =
                    "rgba(0, 0, 0, 0.54)";
                  matrizFiltro.push(new Array());
                  contFilasMF = 0;
                }

                var obj_filtro = {
                  id: casa.id,
                  fraccionamiento: casa.fraccionamiento,
                  precio: casa.precio,
                  correoUsuario: casa.correoUsuario,
                  numeroUsuario: casa.numeroUsuario,
                  usuarioPoseedor:
                    casa.usuarioPoseedor /* ,
                  descripcion: casa.descripcion */
                  /* ,
                  image: buscarImagen(casa).image,
                  profile: buscarImagen(casa).profile */
                };

                // matrizFiltro[matrizFiltro.length - 1].push(casa);
                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);
                // localStorage.setItem("items", JSON.stringify(matrizFiltro));
                setCookie("itemsR", JSON.stringify(matrizFiltro));
                // cookies.set(
                //   { url: urlcookies, name: "items", value: matrizFiltro },
                //   error => {
                //     if (error) console.error(error);
                //   }
                // );
                // itemsPaginado = matrizFiltro;
                contFilasMF++;
              }
            });
          }
          break;

        case "amueblada":
          var rb = getRadioButtonSelectedValue(
            document.getElementById("rdbtn")
          );
          for (var i = 0; i < array.length; i++) {
            array[i].forEach(casa => {
              if (casa.amueblada.toLowerCase() == rb) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {
                    // crearItem(casa, buscarImagen(casa), "");
                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );
                    // document.getElementById("casas").appendChild(casa.item);
                    // console.log(casa.item);
                    contItems++;
                  }
                } else {
                  document.getElementById("ar").style.color =
                    "rgba(0, 0, 0, 0.54)";
                  matrizFiltro.push(new Array());
                  contFilasMF = 0;
                }

                var obj_filtro = {
                  id: casa.id,
                  fraccionamiento: casa.fraccionamiento,
                  precio: casa.precio,
                  correoUsuario: casa.correoUsuario,
                  numeroUsuario: casa.numeroUsuario,
                  usuarioPoseedor:
                    casa.usuarioPoseedor /* ,
                  descripcion: casa.descripcion */
                  /* ,
                  image: buscarImagen(casa).image,
                  profile: buscarImagen(casa).profile */
                };

                // matrizFiltro[matrizFiltro.length - 1].push(casa);
                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);
                // localStorage.setItem("items", JSON.stringify(matrizFiltro));
                setCookie("itemsR", JSON.stringify(matrizFiltro));
                // cookies.set(
                //   { url: urlcookies, name: "items", value: matrizFiltro },
                //   error => {
                //     if (error) console.error(error);
                //   }
                // );
                contFilasMF++;
              }
            });
          }
          break;

        case "estado":
          for (var i = 0; i < array.length; i++) {
            array[i].forEach(casa => {
              if (casa.estadoLugar.toLowerCase().indexOf(dato) == 0) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {
                    // crearItem(casa, buscarImagen(casa), "");
                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );
                    // document.getElementById("casas").appendChild(casa.item);
                    // console.log(casa.item);
                    contItems++;
                  }
                } else {
                  document.getElementById("ar").style.color =
                    "rgba(0, 0, 0, 0.54)";
                  matrizFiltro.push(new Array());
                  contFilasMF = 0;
                }

                var obj_filtro = {
                  id: casa.id,
                  fraccionamiento: casa.fraccionamiento,
                  precio: casa.precio,
                  correoUsuario: casa.correoUsuario,
                  numeroUsuario: casa.numeroUsuario,
                  usuarioPoseedor:
                    casa.usuarioPoseedor /* ,
                  descripcion: casa.descripcion */
                  /* ,
                  image: buscarImagen(casa).image,
                  profile: buscarImagen(casa).profile */
                };

                // matrizFiltro[matrizFiltro.length - 1].push(casa);
                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);
                // localStorage.setItem("items", JSON.stringify(matrizFiltro));
                setCookie("itemsR", JSON.stringify(matrizFiltro));
                // cookies.set(
                //   { url: urlcookies, name: "items", value: matrizFiltro },
                //   error => {
                //     if (error) console.error(error);
                //   }
                // );
                contFilasMF += 1;
              }
            });
          }
          break;

        // case "precio":
        //   // var valores = $(".range-slider").val();
        //   // rango = valores.split(",");
        //   // localStorage.setItem("range", JSON.stringify(rango));
        //   // console.log(rango);
        //   var min = document.getElementById("minimo").value;
        //   var max = document.getElementById("maximo").value;
        //   rango = [min, max];
        //   // localStorage.setItem("range", JSON.stringify(rango));
        //   setCookie("rangeV", JSON.stringify(rango));
        //   // cookies.set(
        //   //   { url: urlcookies, name: "range", value: rango },
        //   //   error => {
        //   //     if (error) console.error(error);
        //   //   }
        //   // );
        //   for (var i = 0; i < array.length; i++) {
        //     array[i].forEach(casa => {
        //       // if (casa.precio.toLowerCase().indexOf(dato) == 0) {
        //       if (casa.precio >= min && casa.precio <= max) {
        //         if (contFilasMF < 15) {
        //           if (contItems < 15) {
        //             // crearItem(casa, buscarImagen(casa), "");
        //             crearItem(
        //               casa,
        //               buscarImagen(casa).image,
        //               buscarImagen(casa).profile
        //             );
        //             // console.log(casa);
        //             // document.getElementById("casas").appendChild(casa.item);
        //             contItems++;
        //           }
        //         } else {
        //           document.getElementById("ar").style.color =
        //             "rgba(0, 0, 0, 0.54)";
        //           matrizFiltro.push(new Array());
        //           contFilasMF = 0;
        //         }
        //         matrizFiltro[matrizFiltro.length - 1].push(casa);
        //         // localStorage.setItem("items", JSON.stringify(matrizFiltro));
        //         setCookie("itemsV", JSON.stringify(matrizFiltro));
        //         // cookies.set(
        //         //   { url: urlcookies, name: "items", value: matrizFiltro },
        //         //   error => {
        //         //     if (error) console.error(error);
        //         //   }
        //         // );
        //         // itemsPaginado = matrizFiltro;
        //         contFilasMF++;
        //       }
        //       // console.log(matrizFiltro);
        //       // console.log(contFilasMF);
        //     });
        //   }
        //   break;

        // case "fraccionamiento":
        //   for (var i = 0; i < array.length; i++) {
        //     array[i].forEach(casa => {
        //       if (casa.fraccionamiento.toLowerCase().indexOf(dato) == 0) {
        //         if (contFilasMF < 15) {
        //           if (contItems < 15) {
        //             // crearItem(casa, buscarImagen(casa), "");
        //             crearItem(
        //               casa,
        //               buscarImagen(casa).image,
        //               buscarImagen(casa).profile
        //             );
        //             // document.getElementById("casas").appendChild(casa.item);
        //             // console.log(casa.item);
        //             contItems++;
        //           }
        //         } else {
        //           document.getElementById("ar").style.color =
        //             "rgba(0, 0, 0, 0.54)";
        //           matrizFiltro.push(new Array());
        //           contFilasMF = 0;
        //         }
        //         matrizFiltro[matrizFiltro.length - 1].push(casa);
        //         // localStorage.setItem("items", JSON.stringify(matrizFiltro));
        //         setCookie("itemsV", JSON.stringify(matrizFiltro));
        //         // cookies.set(
        //         //   { url: urlcookies, name: "items", value: matrizFiltro },
        //         //   error => {
        //         //     if (error) console.error(error);
        //         //   }
        //         // );
        //         // itemsPaginado = matrizFiltro;
        //         contFilasMF++;
        //       }
        //       // console.log(matrizFiltro);
        //       // console.log(contFilasMF);
        //     });
        //   }
        //   break;

        // case "plantas":
        //   for (var i = 0; i < array.length; i++) {
        //     array[i].forEach(casa => {
        //       if (casa.nPlantas == dato.trim()) {
        //         if (contFilasMF < 15) {
        //           if (contItems < 15) {
        //             // crearItem(casa, buscarImagen(casa), "");
        //             crearItem(
        //               casa,
        //               buscarImagen(casa).image,
        //               buscarImagen(casa).profile
        //             );
        //             // document.getElementById("casas").appendChild(casa.item);
        //             // console.log(casa.item);
        //             contItems++;
        //           }
        //         } else {
        //           document.getElementById("ar").style.color =
        //             "rgba(0, 0, 0, 0.54)";
        //           matrizFiltro.push(new Array());
        //           contFilasMF = 0;
        //         }
        //         matrizFiltro[matrizFiltro.length - 1].push(casa);
        //         // localStorage.setItem("items", JSON.stringify(matrizFiltro));
        //         setCookie("itemsV", JSON.stringify(matrizFiltro));
        //         // cookies.set(
        //         //   { url: urlcookies, name: "items", value: matrizFiltro },
        //         //   error => {
        //         //     if (error) console.error(error);
        //         //   }
        //         // );
        //         // itemsPaginado = matrizFiltro;
        //         contFilasMF++;
        //       }
        //     });
        //     // console.log(matrizFiltro);
        //     // console.log(contFilasMF);
        //   }
        //   break;

        // case "recamaras":
        //   for (var i = 0; i < array.length; i++) {
        //     array[i].forEach(casa => {
        //       if (casa.numRecamaras == dato.trim()) {
        //         if (contFilasMF < 15) {
        //           if (contItems < 15) {
        //             // crearItem(casa, buscarImagen(casa), "");
        //             crearItem(
        //               casa,
        //               buscarImagen(casa).image,
        //               buscarImagen(casa).profile
        //             );
        //             // document.getElementById("casas").appendChild(casa.item);
        //             // console.log(casa.item);
        //             contItems++;
        //           }
        //         } else {
        //           document.getElementById("ar").style.color =
        //             "rgba(0, 0, 0, 0.54)";
        //           matrizFiltro.push(new Array());
        //           contFilasMF = 0;
        //         }
        //         matrizFiltro[matrizFiltro.length - 1].push(casa);
        //         // localStorage.setItem("items", JSON.stringify(matrizFiltro));
        //         setCookie("itemsV", JSON.stringify(matrizFiltro));
        //         // cookies.set(
        //         //   { url: urlcookies, name: "items", value: matrizFiltro },
        //         //   error => {
        //         //     if (error) console.error(error);
        //         //   }
        //         // );
        //         // itemsPaginado = matrizFiltro;
        //         contFilasMF++;
        //       }
        //     });
        //     // console.log(matrizFiltro);
        //     // console.log(contFilasMF);
        //   }
        //   break;
        // case "banios":
        //   for (var i = 0; i < array.length; i++) {
        //     array[i].forEach(casa => {
        //       if (casa.numBanios == dato.trim()) {
        //         if (contFilasMF < 15) {
        //           if (contItems < 15) {
        //             // crearItem(casa, buscarImagen(casa), "");
        //             crearItem(
        //               casa,
        //               buscarImagen(casa).image,
        //               buscarImagen(casa).profile
        //             );
        //             // document.getElementById("casas").appendChild(casa.item);
        //             // console.log(casa.item);
        //             contItems++;
        //           }
        //         } else {
        //           document.getElementById("ar").style.color =
        //             "rgba(0, 0, 0, 0.54)";
        //           matrizFiltro.push(new Array());
        //           contFilasMF = 0;
        //         }
        //         matrizFiltro[matrizFiltro.length - 1].push(casa);
        //         // localStorage.setItem("items", JSON.stringify(matrizFiltro));
        //         setCookie("itemsV", JSON.stringify(matrizFiltro));
        //         // cookies.set(
        //         //   { url: urlcookies, name: "items", value: matrizFiltro },
        //         //   error => {
        //         //     if (error) console.error(error);
        //         //   }
        //         // );
        //         // itemsPaginado = matrizFiltro;
        //         contFilasMF++;
        //       }
        //     });
        //   }
        //   break;

        // case "terreno":
        //   for (var i = 0; i < array.length; i++) {
        //     array[i].forEach(casa => {
        //       if (casa.supTerreno == dato.trim()) {
        //         if (contFilasMF < 15) {
        //           if (contItems < 15) {
        //             // crearItem(casa, buscarImagen(casa), "");
        //             crearItem(
        //               casa,
        //               buscarImagen(casa).image,
        //               buscarImagen(casa).profile
        //             );
        //             // document.getElementById("casas").appendChild(casa.item);
        //             // console.log(casa.item);
        //             contItems++;
        //           }
        //         } else {
        //           document.getElementById("ar").style.color =
        //             "rgba(0, 0, 0, 0.54)";
        //           matrizFiltro.push(new Array());
        //           contFilasMF = 0;
        //         }
        //         matrizFiltro[matrizFiltro.length - 1].push(casa);
        //         // localStorage.setItem("items", JSON.stringify(matrizFiltro));
        //         setCookie("itemsV", JSON.stringify(matrizFiltro));
        //         // cookies.set(
        //         //   { url: urlcookies, name: "items", value: matrizFiltro },
        //         //   error => {
        //         //     if (error) console.error(error);
        //         //   }
        //         // );
        //         // itemsPaginado = matrizFiltro;
        //         contFilasMF++;
        //       }
        //     });
        //   }
        //   break;

        // case "construccion":
        //   for (var i = 0; i < array.length; i++) {
        //     array[i].forEach(casa => {
        //       if (casa.supConstruccion == dato.trim()) {
        //         if (contFilasMF < 15) {
        //           if (contItems < 15) {
        //             // crearItem(casa, buscarImagen(casa), "");
        //             crearItem(
        //               casa,
        //               buscarImagen(casa).image,
        //               buscarImagen(casa).profile
        //             );
        //             // document.getElementById("casas").appendChild(casa.item);
        //             // console.log(casa.item);
        //             contItems++;
        //           }
        //         } else {
        //           document.getElementById("ar").style.color =
        //             "rgba(0, 0, 0, 0.54)";
        //           matrizFiltro.push(new Array());
        //           contFilasMF = 0;
        //         }
        //         matrizFiltro[matrizFiltro.length - 1].push(casa);
        //         // localStorage.setItem("items", JSON.stringify(matrizFiltro));
        //         setCookie("itemsV", JSON.stringify(matrizFiltro));
        //         // cookies.set(
        //         //   { url: urlcookies, name: "items", value: matrizFiltro },
        //         //   error => {
        //         //     if (error) console.error(error);
        //         //   }
        //         // );
        //         // itemsPaginado = matrizFiltro;
        //         contFilasMF++;
        //       }
        //     });
        //   }
        //   break;

        // case "amueblada":
        //   var rb = getRadioButtonSelectedValue(
        //     document.getElementById("rdbtn")
        //   );
        //   for (var i = 0; i < array.length; i++) {
        //     array[i].forEach(casa => {
        //       if (casa.amueblada.toLowerCase() == rb) {
        //         if (contFilasMF < 15) {
        //           if (contItems < 15) {
        //             // crearItem(casa, buscarImagen(casa), "");
        //             crearItem(
        //               casa,
        //               buscarImagen(casa).image,
        //               buscarImagen(casa).profile
        //             );
        //             // document.getElementById("casas").appendChild(casa.item);
        //             // console.log(casa.item);
        //             contItems++;
        //           }
        //         } else {
        //           document.getElementById("ar").style.color =
        //             "rgba(0, 0, 0, 0.54)";
        //           matrizFiltro.push(new Array());
        //           contFilasMF = 0;
        //         }
        //         matrizFiltro[matrizFiltro.length - 1].push(casa);
        //         // localStorage.setItem("items", JSON.stringify(matrizFiltro));
        //         setCookie("itemsV", JSON.stringify(matrizFiltro));
        //         // cookies.set(
        //         //   { url: urlcookies, name: "items", value: matrizFiltro },
        //         //   error => {
        //         //     if (error) console.error(error);
        //         //   }
        //         // );
        //         contFilasMF++;
        //       }
        //     });
        //   }
        //   break;

        // case "estado":
        //   for (var i = 0; i < array.length; i++) {
        //     array[i].forEach(casa => {
        //       if (casa.estadoLugar.toLowerCase().indexOf(dato) == 0) {
        //         if (contFilasMF < 15) {
        //           if (contItems < 15) {
        //             // crearItem(casa, buscarImagen(casa), "");
        //             crearItem(
        //               casa,
        //               buscarImagen(casa).image,
        //               buscarImagen(casa).profile
        //             );
        //             // document.getElementById("casas").appendChild(casa.item);
        //             // console.log(casa.item);
        //             contItems++;
        //           }
        //         } else {
        //           document.getElementById("ar").style.color =
        //             "rgba(0, 0, 0, 0.54)";
        //           matrizFiltro.push(new Array());
        //           contFilasMF = 0;
        //         }
        //         matrizFiltro[matrizFiltro.length - 1].push(casa);
        //         // localStorage.setItem("items", JSON.stringify(matrizFiltro));
        //         setCookie("itemsV", JSON.stringify(matrizFiltro));
        //         // cookies.set(
        //         //   { url: urlcookies, name: "items", value: matrizFiltro },
        //         //   error => {
        //         //     if (error) console.error(error);
        //         //   }
        //         // );
        //         contFilasMF += 1;
        //       }
        //     });
        //   }
        //   break;
      }
    }

    function mostrarPagina(pag, arreglo) {
      document.getElementById("main").innerHTML = "";
      detenerAnimacion();
      // if (document.getElementById("placeholder")) {
      //   document.getElementById("main").removeChild(placeholder);
      // }
      // if (document.getElementById("placeholder")) {
      // document.getElementById("main").removeChild(placeholder);
      // document.getElementById("placeholder").innerHTML = "";
      // }
      if (paginaActual + 1 >= matrizItems.length - 1)
        document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.26)";
      // var cont = 0;
      arreglo[pag].forEach(casa => {
        // crearItem(casa, buscarImagen(casa), "");
        crearItem(casa, buscarImagen(casa).image, buscarImagen(casa).profile);
      });

      paginaActual = pag;
      // localStorage.setItem("actpage", JSON.stringify(paginaActual));
      setCookie("actpageR", JSON.stringify(paginaActual));
      // cookies.set(
      //   { url: urlcookies, name: "actpage", value: paginaActual },
      //   error => {
      //     if (error) console.error(error);
      //   }
      // );
      document.getElementById("numpag").innerHTML = pag + 1;
    }

    document.getElementById("ar").addEventListener("click", function() {
      if (itemsPaginado == "T") {
        if (paginaActual + 1 >= matrizItems.length - 1) {
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.26)";
          if (paginaActual < matrizItems.length - 1) {
            mostrarPagina(paginaActual + 1, matrizItems);
          }
        } else {
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.54)";
          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.54)";
          // iniciarLoader();
          mostrarPagina(paginaActual + 1, matrizItems);
        }
      } else {
        if (paginaActual + 1 >= matrizFiltro.length - 1) {
          //mostrarPagina(0, matrizFiltro);
          // document.getElementById("ar").style.display = "none";
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.26)";
          if (paginaActual < matrizFiltro.length - 1) {
            mostrarPagina(paginaActual + 1, matrizFiltro);
          }
        } else {
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.54)";
          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.54)";
          // iniciarLoader();
          mostrarPagina(paginaActual + 1, matrizFiltro);
          // document.getElementById("al").style.display = "inline-block";
        }
      }
    });
    document.getElementById("al").addEventListener("click", function() {
      if (itemsPaginado == "T") {
        if (paginaActual - 1 <= 0) {
          //mostrarPagina(matrizItems.length - 1, matrizItems);
          // document.getElementById("al").style.display = "none";
          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.26)";
          if (paginaActual > 0) {
            mostrarPagina(paginaActual - 1, matrizItems);
          }
        } else {
          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.54)";
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.54)";
          // iniciarLoader();
          mostrarPagina(paginaActual - 1, matrizItems);
          // document.getElementById("ar").style.display = "inline-block";
        }
      } else {
        if (paginaActual - 1 <= 0) {
          // mostrarPagina(matrizFiltro.length - 1, matrizFiltro);
          // document.getElementById("al").style.display = "none";
          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.26)";
          if (paginaActual > 0) {
            mostrarPagina(paginaActual - 1, matrizFiltro);
          }
        } else {
          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.54)";
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.54)";
          // iniciarLoader();
          mostrarPagina(paginaActual - 1, matrizFiltro);
          // document.getElementById("ar").style.display = "inline-block";
        }
      }
    });

    document.getElementById("back").addEventListener("click", function() {
      eliminarCookies();
    });
  });
})();
=======
const Swal = require('sweetalert2');

let buttonPerfilClicked = false;

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

    let dbRef = firebase.database().ref("Oferta/Aguascalientes");
    let storagePorfile = firebase.storage().ref("/profile_pictures");
    var storage = firebase.storage().ref("/fotos");

    var topShadow = document.getElementById("content-filtros");

    let habitacional = document.getElementById("habitacional");
    let comercial = document.getElementById("comercial");
    let rustico = document.getElementById("rustico");
    let terreno = document.getElementById("terreno");

    habitacional.addEventListener("click", function() {
      window.location = "habitacional.html?modo=renta";
    });

    comercial.addEventListener("click", function() {
      window.location = "comercial.html?modo=renta";
    });

    rustico.addEventListener("click", function() {
      window.location = "rustico.html?modo=renta";
    });

    terreno.addEventListener("click", function() {
      window.location = "terreno.html?modo=renta";
    });

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
>>>>>>> 9daba400ea2cbc188df48a5c7eeb64eae7bcca1b
