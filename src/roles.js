export function initMap(role) {
  // Carga Leaflet y plugins desde CDN en el HTML o aquí con import si usas bundler
  const map = L.map('map').setView([-25.2637, -57.5759], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Herramientas básicas para Novato
  if (role === "novato") {
    // Solo marcadores y popup
    map.on('click', function(e) {
      L.marker(e.latlng).addTo(map)
        .bindPopup('Nuevo punto').openPopup();
    });
  }
  // Herramientas extra para Ayudante
  if (role === "ayudante") {
    // Agrega medición, importación de datos, etc.
  }
  // Herramientas premium para Maestro
  if (role === "maestro") {
    // Capas avanzadas, exportación ZIP, personalización
  }
}
