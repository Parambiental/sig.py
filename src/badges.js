export function renderBadge(role) {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = ''; // Limpia el sidebar
  const badge = document.createElement('img');
  badge.className = 'user-badge';
  badge.alt = `Badge ${role}`;
  badge.title = {
    novato: "Novato: Estudiante",
    ayudante: "Ayudante: Colaborador",
    maestro: "Maestro: Profesional"
  }[role];
  badge.src = `/assets/badges/${role}.svg`;
  badge.tabIndex = 0;
  badge.setAttribute('aria-label', badge.title);
  badge.addEventListener('mouseover', () => {
    badge.style.transform = 'scale(1.1) rotate(-5deg)';
    // Aquí puedes reproducir un sonido si quieres
  });
  badge.addEventListener('mouseout', () => {
    badge.style.transform = '';
  });
  sidebar.appendChild(badge);
}
