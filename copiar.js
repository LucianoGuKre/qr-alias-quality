// Landing: completa los textos desde config.js y copia el alias al portapapeles.

// Pone los datos de config.js en todos los elementos marcados con data-campo
document.querySelectorAll("[data-campo]").forEach(function (el) {
  el.textContent = CONFIG[el.dataset.campo];
});
document.title = CONFIG.negocio + " · Alias para transferir";

var boton = document.getElementById("copiar");
var aviso = document.getElementById("aviso");
var temporizador;

// Plan B para navegadores viejos o páginas sin https:
// copia desde un textarea invisible con el comando clásico del navegador.
function copiarViejo(texto) {
  var area = document.createElement("textarea");
  area.value = texto;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  area.setSelectionRange(0, texto.length); // necesario en iPhone
  var ok = false;
  try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
  document.body.removeChild(area);
  return ok;
}

// Plan C: si no se pudo copiar, deja el alias seleccionado para copiarlo a mano
function seleccionarAlias() {
  var rango = document.createRange();
  rango.selectNodeContents(document.getElementById("alias"));
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(rango);
}

function mostrarAviso(texto, error) {
  aviso.textContent = texto;
  aviso.classList.toggle("error", !!error);
  boton.classList.toggle("copiado", !error);
  if (!error) boton.textContent = "✓ ¡Copiado!";
  clearTimeout(temporizador);
  temporizador = setTimeout(function () {
    boton.textContent = "Copiar alias";
    boton.classList.remove("copiado");
  }, 2500);
}

function exito() { mostrarAviso("¡Alias copiado! Ahora pegalo en tu banco o billetera."); }
function fallo() {
  seleccionarAlias();
  mostrarAviso("No se pudo copiar solo. Mantené apretado el alias y elegí “Copiar”.", true);
}

boton.addEventListener("click", function () {
  var alias = CONFIG.alias;
  // Plan A: la API moderna (solo funciona en https o localhost)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(alias).then(exito, function () {
      copiarViejo(alias) ? exito() : fallo();
    });
  } else {
    copiarViejo(alias) ? exito() : fallo();
  }
});
