const Swal = require("sweetalert2");
let remote = require("electron").remote;
const cookies = remote.session.defaultSession.cookies;

var urlcookies = "http://www.github.com";
var matrizItems = [new Array()];
var matrizFiltro = [new Array()];
var arregloimg = [];
var rango = [];
var contItems = 0;
var contFilasMI = 0;
var contFilasMF = 0;
var paginaActual = 0;
var itemsPaginado = "T";
var placeholder = document.getElementById("placeholder");

function eliminarCookies() {
  cookies.remove(urlcookies, "itemspag", function () {});
  cookies.remove(urlcookies, "filtro", function () {});
  cookies.remove(urlcookies, "imagenes", function () {});
  cookies.remove(urlcookies, "items", function () {});
  cookies.remove(urlcookies, "range", function () {});
  cookies.remove(urlcookies, "rb", function () {});
  cookies.remove(urlcookies, "dato", function () {});
  cookies.remove(urlcookies, "actpage", function () {});
}

function buscarCookie(nombre, arreglo) {
  return new Promise((resolve, reject) => {
    cookies.get({
      name: nombre
    }, (error, cookies) => {
      if (error) reject(error);
      if (cookies[0] != undefined) {
        arreglo.push(cookies[0].value);
      } else {
        arreglo.push(false);
      }
      resolve(arreglo);
    });
  });
}

function setCookie(nombre, valor) {
  cookies.set({
    url: urlcookies,
    name: nombre,
    value: valor
  }, error => {
    if (error) console.error(error);
  });
}

(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var config = {
      apiKey: "AIzaSyBYJJPXZGJYJgNdZIaIAXZZ0DE-3DsfSYw",
      authDomain: "inmobiliariasmx.firebaseapp.com",
      databaseURL: "https://inmobiliariasmx.firebaseio.com",
      projectId: "inmobiliariasmx",
      storageBucket: "inmobiliariasmx.appspot.com",
      messagingSenderId: "374273595319"
    };

    firebase.initializeApp(config);

    //Pago
    let layoutSinPagar = document.getElementById("layout-sinPagar");
    let layoutPagado = document.getElementById("layout-pagado");

    let dbRef = firebase.database().ref("Oferta/Aguascalientes");
    let storageProfile = firebase.storage().ref("/profile_pictures");
    var storage = firebase.storage().ref("/fotos");

    var topShadow = document.getElementById("top-bar");

    let imgPerfil = document.getElementById("imgPerfil");
    // let contitems = 0;

    let storagePorfilePropio = firebase.storage().ref("/profile_pictures");

    window.onscroll = function () {
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

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        storagePorfilePropio.child(user.uid + "profilePicture").getDownloadURL().then(function(url) {
          imgPerfil.src = url;
        }).catch(function(error) {
          imgPerfil.src = "img/account_circle_grey.png";
        });

        var ref = firebase
          .database()
          .ref("/Usuarios")
          .child(user.uid + "/Datos_Usuario");

        ref.on("value", function (snapshot) {
          var datos = snapshot.val();

          if (datos.Pago === "PENDIENTE") {
            layoutSinPagar.style.display = "block";
            layoutPagado.style.display = "none";
          } else if (datos.Pago === "PAGADO") {
            layoutSinPagar.style.display = "none";
            layoutPagado.style.display = "block";
          }
        });

      }
    });

    buscarCookie("itemspag", [])
      .then(val => {
        return buscarCookie("filtro", val);
      })
      .then(val => {
        return buscarCookie("imagenes", val);
      })
      .then(val => {
        return buscarCookie("items", val);
      })
      .then(val => {
        return buscarCookie("range", val);
      })
      .then(val => {
        return buscarCookie("rb", val);
      })
      .then(val => {
        return buscarCookie("dato", val);
      })
      .then(val => {
        return buscarCookie("actpage", val);
      })
      .then(val => {

        if (val[0] != false && val[1] != "Sin Filtro" && val[0] == "F") {

          arregloimg = JSON.parse(val[2]);

          matrizFiltro = JSON.parse(val[3]);

          paginaActual = JSON.parse(val[7]);

          var sel = document.getElementById("tipo");
          for (var i = 0; i < sel.children.length; i++) {

            if (val[1] == sel.children[i].value)
              sel.children[i].selected = true;
          }

          if (val[1] == "precio") {

            if (JSON.parse(val[4]) != false) {

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

            }

          } else if (val[1] == "amueblada") {
            document.getElementById("IF").disabled = true;
            document.getElementById("contenedor_slider").style.display = "none";

            if (val[5] != false) {
              var rb = document.getElementById("rdbtn");
              for (i = 0; i < rb.length; i++) {

                if (val[5] == rb[i].value) {
                  rb[i].checked = true;

                }
              }

            }
            document.getElementById("rdbtn").style.display = "block";
          } else {

            var min = document.getElementById("precio_min");
            var max = document.getElementById("precio_max");
            min.style.display = "none";
            max.style.display = "none";
          }


          itemsPaginado = val[0];


          document.getElementById("IF").value = val[6];


          mostrarPagina(paginaActual, matrizFiltro);
        } else {
          eliminarCookies();
        }
      });

    dbRef.on("child_added", function (snapshot) {

      let casa = snapshot.val();
      let key = snapshot.key;


      obtenerUrlCasa(casa).then(function (image) {
        var img = image;

        obtenerUrlProfile(casa).then(function (profile) {

          var prof = profile;

          arregloimg.push({
            id: casa.id,
            image: img,
            profile: prof
          });

          buscarCookie("itemspag", []).then(val => {
            if (contFilasMI < 15) {

              if (contItems < 15 && val[0] == false) {

                crearItem(casa, image, profile);

                contItems++;
              } else {

                detenerAnimacion();

              }
            } else {
              matrizItems.push(new Array());
              contFilasMI = 0;
            }
            matrizItems[matrizItems.length - 1].push(casa);

            contFilasMI++;
          });
        });
      });

    });

    function crearItem(casa, img, perfil) {
      let articulo = document.createElement("article");

      articulo.setAttribute("id", casa.id);

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
          <p class="nombre etc">${casa.usuarioPoseedor}</p>
        </div>
      </div>
      <div class="fracc-precio">
        <div class="fraccionamiento-contenedor">
          <p class="etc"><i class="fas fa-map-marker-alt"></i>${
            casa.fraccionamiento
          }</p>
        </div>
        <p class="precio">${precio}</p>
      </div>
      `;

      articulo.innerHTML = contenido;
      articulo.addEventListener("click", function () {
        var articleId = articulo.getAttribute("id");
        
        window.location =
          "infoCompletaPublico.html?id=" + articleId.toString();
      });

      let imgCasa = document.createElement("img");
      document.getElementById("main").appendChild(articulo);
    }

    function obtenerUrlCasa(casa) {
      return storage
        .child(casa.userId + casa.id + "1")
        .getDownloadURL()
        .then(function (url) {

          return url;
        })
        .catch(function (error) {

          return "img/image_off.png";
        });
    }

    function obtenerUrlProfile(casa) {
      return storageProfile
        .child(casa.userId + "profilePicture")
        .getDownloadURL()
        .then(function (urlprofile) {
          return urlprofile;
        })
        .catch(function (error) {
          return "img/account_circle_grey.png";
        });
    }

    function detenerAnimacion() {

      document.getElementById("placeholder").innerHTML = "";

      document.getElementById("loader_menu").style.display = "none";


      document.getElementById("loader_pag").style.display = "none";
      document.getElementById("loader_search").style.display = "none";
      document.getElementById("loader_filtro").style.display = "none";

      document.getElementById("links").classList.remove("hidden");
      document.getElementById("busqueda").classList.remove("hidden");
      document.getElementById("filtros").classList.remove("hidden");


      document.getElementById("paginado").style.display = "inline-block";


    }



    function buscarImagen(casa) {
      for (var i = 0; i < arregloimg.length; i++) {
        if (arregloimg[i].id == casa.id) {
          return arregloimg[i];
        }
      }
    }

    function filtrarElementos(e) {
      document.getElementById("main").innerHTML = "";
      matrizFiltro = [new Array()];
      document.getElementById("numpag").innerHTML = "1";
      itemsPaginado = "F";

      setCookie("itemspag", itemsPaginado);

      contFilasMF = 0;
      contItems = 0;
      paginaActual = 0;
      document.getElementById("al").style.color = "rgba(0, 0, 0, 0.26)";
      document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.26)";

      setCookie("actpage", JSON.stringify(paginaActual));

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

        var min = document.getElementById("precio_min");
        var max = document.getElementById("precio_max");
        min.style.display = "block";
        max.style.display = "block";

      } else {

        var min = document.getElementById("precio_min");
        var max = document.getElementById("precio_max");
        min.style.display = "none";
        max.style.display = "none";

      }


      setCookie("dato", document.getElementById("IF").value);

      setCookie(
        "filtro",
        document.getElementById("tipo").options[
          document.getElementById("tipo").selectedIndex
        ].value
      );

      buscarItem(dato, filtro);

    }

    document.getElementById("tipo").addEventListener("change", function () {
      filtrarElementos(itemsPaginado);

    });

    document.getElementById("IF").addEventListener("input", function () {
      filtrarElementos(itemsPaginado);

    });

    let inputMinimo = document.getElementById("minimo");
    inputMinimo.addEventListener("keypress", function (e) {
      var key = window.event ? e.which : e.keyCode;
      if (key < 48 || key > 57) {
        e.preventDefault();
      }
    });
    inputMinimo.addEventListener("input", function () {
      filtrarElementos(itemsPaginado);

    });

    let inputMaximo = document.getElementById("maximo");
    inputMaximo.addEventListener("keypress", function (e) {
      var key = window.event ? e.which : e.keyCode;
      if (key < 48 || key > 57) {
        e.preventDefault();
      }
    });
    inputMaximo.addEventListener("input", function () {
      filtrarElementos(itemsPaginado);

    });

    function buscarItem(dato, filtro) {

      setCookie("imagenes", JSON.stringify(arregloimg));

      switch (filtro) {
        case "Todo":
          itemsPaginado = "T";

          eliminarCookies();
          matrizItems[0].forEach(casa => {
            crearItem(
              casa,
              buscarImagen(casa).image,
              buscarImagen(casa).profile
            );

          });

          setCookie("itemspag", itemsPaginado);

          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.26)";
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.54)";
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

          setCookie("range", JSON.stringify(rango));

          for (var i = 0; i < matrizItems.length; i++) {
            matrizItems[i].forEach(casa => {

              if (
                casa.precio >= parseInt(rango[0]) &&
                casa.precio <= parseInt(rango[1])
              ) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {

                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );

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
                  usuarioPoseedor: casa.usuarioPoseedor

                };


                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);

                setCookie("items", JSON.stringify(matrizFiltro));

                contFilasMF++;
              }

            });
          }
          break;

        case "fraccionamiento":
          for (var i = 0; i < matrizItems.length; i++) {
            matrizItems[i].forEach(casa => {
              if (casa.fraccionamiento.toLowerCase().indexOf(dato) == 0) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {

                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );

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
                  usuarioPoseedor: casa.usuarioPoseedor

                };


                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);

                setCookie("items", JSON.stringify(matrizFiltro));

                contFilasMF++;
              }
            });
          }
          break;

        case "plantas":
          for (var i = 0; i < matrizItems.length; i++) {
            matrizItems[i].forEach(casa => {
              if (casa.nPlantas == dato.trim()) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {

                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );

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
                  usuarioPoseedor: casa.usuarioPoseedor

                };


                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);

                setCookie("items", JSON.stringify(matrizFiltro));

                contFilasMF++;
              }
            });

          }
          break;

        case "recamaras":
          for (var i = 0; i < matrizItems.length; i++) {
            matrizItems[i].forEach(casa => {
              if (casa.numRecamaras == dato.trim()) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {

                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );

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
                  usuarioPoseedor: casa.usuarioPoseedor

                };


                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);

                setCookie("items", JSON.stringify(matrizFiltro));

                contFilasMF++;
              }
            });

          }
          break;
        case "banios":
          for (var i = 0; i < matrizItems.length; i++) {
            matrizItems[i].forEach(casa => {
              if (casa.numBanios == dato.trim()) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {

                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );

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
                  usuarioPoseedor: casa.usuarioPoseedor

                };


                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);

                setCookie("items", JSON.stringify(matrizFiltro));

                contFilasMF++;
              }
            });
          }
          break;

        case "terreno":
          for (var i = 0; i < matrizItems.length; i++) {
            matrizItems[i].forEach(casa => {
              if (casa.supTerreno == dato.trim()) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {

                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );

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
                  usuarioPoseedor: casa.usuarioPoseedor

                };


                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);

                setCookie("items", JSON.stringify(matrizFiltro));

                contFilasMF++;
              }
            });
          }
          break;

        case "construccion":
          for (var i = 0; i < matrizItems.length; i++) {
            matrizItems[i].forEach(casa => {
              if (casa.supConstruccion == dato.trim()) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {

                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );

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
                  usuarioPoseedor: casa.usuarioPoseedor

                };


                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);

                setCookie("items", JSON.stringify(matrizFiltro));

                contFilasMF++;
              }
            });
          }
          break;

        case "amueblada":
          var rb = getRadioButtonSelectedValue(
            document.getElementById("rdbtn")
          );
          for (var i = 0; i < matrizItems.length; i++) {
            matrizItems[i].forEach(casa => {
              if (casa.amueblada.toLowerCase() == rb) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {

                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );

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
                  usuarioPoseedor: casa.usuarioPoseedor

                };


                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);

                setCookie("items", JSON.stringify(matrizFiltro));

                contFilasMF++;
              }
            });
          }
          break;

        case "estado":
          for (var i = 0; i < matrizItems.length; i++) {
            matrizItems[i].forEach(casa => {
              if (casa.estadoLugar.toLowerCase().indexOf(dato) == 0) {
                if (contFilasMF < 15) {
                  if (contItems < 15) {

                    crearItem(
                      casa,
                      buscarImagen(casa).image,
                      buscarImagen(casa).profile
                    );

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
                  usuarioPoseedor: casa.usuarioPoseedor

                };


                matrizFiltro[matrizFiltro.length - 1].push(obj_filtro);

                setCookie("items", JSON.stringify(matrizFiltro));

                contFilasMF += 1;
              }
            });
          }
          break;
      }
    }

    function mostrarPagina(pag, arreglo) {
      document.getElementById("main").innerHTML = "";
      detenerAnimacion();

      if (paginaActual + 1 >= matrizItems.length - 1)
        document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.26)";

      arreglo[pag].forEach(casa => {

        crearItem(casa, buscarImagen(casa).image, buscarImagen(casa).profile);
      });

      paginaActual = pag;

      setCookie("actpage", JSON.stringify(paginaActual));

      document.getElementById("numpag").innerHTML = pag + 1;
    }

    document.getElementById("ar").addEventListener("click", function () {
      if (itemsPaginado == "T") {
        if (paginaActual + 1 >= matrizItems.length - 1) {
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.26)";
          if (paginaActual < matrizItems.length - 1) {
            mostrarPagina(paginaActual + 1, matrizItems);
          }
        } else {
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.54)";
          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.54)";

          mostrarPagina(paginaActual + 1, matrizItems);
        }
      } else {
        if (paginaActual + 1 >= matrizFiltro.length - 1) {

          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.26)";
          if (paginaActual < matrizFiltro.length - 1) {
            mostrarPagina(paginaActual + 1, matrizFiltro);
          }
        } else {
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.54)";
          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.54)";

          mostrarPagina(paginaActual + 1, matrizFiltro);

        }
      }
    });
    document.getElementById("al").addEventListener("click", function () {
      if (itemsPaginado == "T") {
        if (paginaActual - 1 <= 0) {

          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.26)";
          if (paginaActual > 0) {
            mostrarPagina(paginaActual - 1, matrizItems);
          }
        } else {
          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.54)";
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.54)";

          mostrarPagina(paginaActual - 1, matrizItems);

        }
      } else {
        if (paginaActual - 1 <= 0) {

          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.26)";
          if (paginaActual > 0) {
            mostrarPagina(paginaActual - 1, matrizFiltro);
          }
        } else {
          document.getElementById("al").style.color = "rgba(0, 0, 0, 0.54)";
          document.getElementById("ar").style.color = "rgba(0, 0, 0, 0.54)";

          mostrarPagina(paginaActual - 1, matrizFiltro);

        }
      }
    });

    document.getElementById("venta").addEventListener("click", function () {
      eliminarCookies();
    });

    document.getElementById("renta").addEventListener("click", function () {
      eliminarCookies();
    });
  });
})();