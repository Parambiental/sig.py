import { initMap } from './components/MapComponent.js';
import { initSidebar } from './components/SidebarComponent.js';
import { initUserProfile } from './components/UserProfile.js';

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  initSidebar();
  initUserProfile();
});
