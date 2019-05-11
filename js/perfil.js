let userId;
var img;

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    var config = {
      apiKey: "AIzaSyBYJJPXZGJYJgNdZIaIAXZZ0DE-3DsfSYw",
      authDomain: "inmobiliariasmx.firebaseapp.com",
      databaseURL: "https://inmobiliariasmx.firebaseio.com",
      projectId: "inmobiliariasmx",
      storageBucket: "inmobiliariasmx.appspot.com",
      messagingSenderId: "374273595319"
    };

    firebase.initializeApp(config);

    let imgPerfil = document.getElementById("imgPerfil");
    let articulo = document.createElement("article");
    let divName = document.createElement("div");
    divName.setAttribute("id", "name");

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {

        userId = user.uid;

        var dbRef = firebase.database().ref("Usuarios/" + userId + "/Datos_Usuario");

        dbRef.on("value", function (snapshot) {
          var usuario = snapshot.val();
          var key = snapshot.key;

          imgPerfil.src = `https://firebasestorage.googleapis.com/v0/b/inmobiliariasmx.appspot.com/o/profile_pictures%2F${userId}profilePicture?alt=media&token`;

          let data = `
            <p><i class="fas fa-phone porfile"></i><span>Teléfono: </span>${usuario.Numero}</p>
            <p><i class="fas fa-envelope porfile"></i><span>Correo: </span>${usuario.Correo}</p>
            <p><i class="fas fa-wallet porfile"></i></i><span>Cuenta: </span>${usuario.Pago}</p>
            <p><i class="fas fa-key porfile"></i><span>ID: </span>${userId}</p>

            <p class="texto">El ID es unico por cada cuenta de usuario, podrá ser usado para posibles problemas o aclaraciones y deberá de ser proporcionado a la
            persona que le ofrezca el soporte si la situación lo amerita.</p>

          `;

          divName.innerHTML = usuario.Nombre;
          articulo.innerHTML = data;

          document.getElementById("content-imgName").appendChild(divName);
          document.getElementById("data").appendChild(articulo);

        });

      }
    });

    let modalImg = document.getElementById("modalImg");
    let inputImg = document.getElementById("porfile-image");
    let guardarCroppedImg = document.getElementById("guardarImg");
    let span = document.getElementById("close");

    span.onclick = function () {
      modalImg.style.display = "none";
    }

    //Cerrar el modal cuando de clic en cualquier parte de la pantalla
    window.onclick = function (event) {
      if (event.target === modalImg) {
        modalImg.style.display = "none";
      }
    }

    inputImg.addEventListener("change", function (e) {
      let imgPropiedadCropper = document.getElementById("img-propiedad-cropper");
      img = $("#img-propiedad-cropper");
      img.cropper("destroy");
      modalImg.style.display = "block";
      imgPropiedadCropper.src = URL.createObjectURL(e.target.files[0]);

      img.cropper({
        zoomOnWheel: false
      });

      $('input[type="file"]').val("");
    });

    guardarCroppedImg.addEventListener("click", function (e) {
      modalImg.style.display = "none";
      swal({
        title: "Guardando, Por Favor Espere",
        allowOutsideClick: false
      });
      swal.showLoading();

      var cropper = img.data('cropper');
      var cropeddImg = cropper.getCroppedCanvas();
      cropeddImg.toBlob(function (blob) {
        var storageRef = firebase.storage().ref();
        let uploadImage = storageRef.child("profile_pictures/" + userId + "profilePicture").put(blob).then(function (snapshot) {
          swal.close();
          imgPerfil.src = cropeddImg.toDataURL();
        });

      });
    });


  });

})();