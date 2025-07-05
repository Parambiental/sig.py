import './styles.css';
import { initMap } from './roles.js';
import { renderBadge } from './badges.js';

// Aquí puedes simular el rol (luego lo puedes conectar a un login real)
const userRole = "novato"; // "ayudante" o "maestro"

document.addEventListener('DOMContentLoaded', () => {
  initMap(userRole);
  renderBadge(userRole);
});
