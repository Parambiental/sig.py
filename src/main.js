import './styles.css';
import { initMap } from './roles.js';
import { showBadge } from './badges.js';

document.addEventListener('DOMContentLoaded', () => {
  // Simulación: rol puede venir de login
  const userRole = "novato"; // "ayudante", "maestro"
  initMap(userRole);
  showBadge(userRole);
});
