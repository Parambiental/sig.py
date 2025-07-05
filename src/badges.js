export function showBadge(role) {
  let badgePath = '../assets/badges/novato.svg';
  if (role === 'ayudante') badgePath = '../assets/badges/ayudante.svg';
  if (role === 'maestro') badgePath = '../assets/badges/maestro.svg';
  document.querySelector('.user-badge').src = badgePath;
}
