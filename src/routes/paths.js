export function switchPath(pathname, destination) {
  const parts = pathname.split('/').filter(Boolean).slice(1);
  if (!parts.length) return '/' + destination.id;
  if (parts.length === 1 && ['about', 'portfolio', 'contact'].includes(parts[0])) return '/' + destination.id + '/' + parts[0];
  if (parts.length === 2 && parts[0] === 'portfolio' && destination.projects.some(p => p.slug === parts[1])) return '/' + destination.id + '/portfolio/' + parts[1];
  return '/' + destination.id;
}
