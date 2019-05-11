function mostrarAnimacion() {
  var contenedor = document.getElementById("placeholder");
  for (i = 0; i < 12; i++) {
    var a = document.createElement("article");
    a.setAttribute("class", "container");
    a.innerHTML =
      "<div class='background'>" +
      "<div class='image'></div>" +
      "<div class='mask thin'></div>" +
      "<div class='bar'></div>" +
      "<div class='mask thin'></div>" +
      "<div class='bar'></div>" +
      "<div class='mask thin'></div>" +
      "<div class='bar medium'></div>" +
      "<div class='mask thin'></div>" +
      "<div class='bar small'></div>" +
      "<div class='mask thin'></div>" +
      "</div>";

    contenedor.appendChild(a);
  }
}

mostrarAnimacion();