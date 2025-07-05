export function showBadge(role) {
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = ''; // Limpia
  const badge = document.createElement('img');
  badge.className = 'user-badge';
  badge.alt = `Badge ${role}`;
  badge.title = {
    novato: "Novato: Estudiante",
    ayudante: "Ayudante: Colaborador",
    maestro: "Maestro: Profesional"
  }[role];
  badge.src = `/assets/badges/${role}.svg`;
  sidebar.appendChild(badge);
}
