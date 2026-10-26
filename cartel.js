// Cartel: completa los textos desde config.js y dibuja el QR apuntando a la landing.

document.querySelectorAll("[data-campo]").forEach(function (el) {
  el.textContent = CONFIG[el.dataset.campo];
});
document.getElementById("destino").textContent = CONFIG.urlLanding;

// qrcode(0, "H"): 0 = tamaño automático según el texto,
// "H" = máxima corrección de errores (se lee aunque el cartel esté sucio o doblado, hasta ~30% dañado)
var qr = qrcode(0, "H");
qr.addData(CONFIG.urlLanding);
qr.make();

// SVG escalable con 4 módulos de margen blanco (el mínimo que pide el estándar QR)
document.getElementById("qr").innerHTML = qr.createSvgTag({ scalable: true, margin: 4 });
