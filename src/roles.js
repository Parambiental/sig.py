export function initMap(role) {
  // Inicialización básica de Leaflet
  const map = L.map('map').setView([-25.2637, -57.5759], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Herramientas según el rol
  if (role === "novato") {
    // Solo marcadores simples
    map.on('click', function(e) {
      L.marker(e.latlng).addTo(map)
        .bindPopup('Nuevo punto').openPopup();
    });
  }

  if (role === "ayudante") {
    // Herramientas de medición y dibujo
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    const drawControl = new L.Control.Draw({
      edit: { featureGroup: drawnItems },
      draw: { polygon: true, polyline: true, rectangle: true, marker: true }
    });
    map.addControl(drawControl);
    map.on(L.Draw.Event.CREATED, function (e) {
      drawnItems.addLayer(e.layer);
    });
  }

  if (role === "maestro") {
    // Todas las herramientas + personalización
    // Puedes agregar importación/exportación, capas WMS, etc.
    // Ejemplo: mostrar un mensaje especial
    L.easyButton('fa-crown', function(btn, map){
      alert("¡Herramientas premium activadas!");
    }, 'Herramientas Maestro').addTo(map);
  }
}
