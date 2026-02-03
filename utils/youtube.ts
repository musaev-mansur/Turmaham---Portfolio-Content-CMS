/**
 * Преобразует ссылку YouTube (watch, youtu.be) в embed-формат для iframe
 */
export function toEmbedUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const u = url.trim();
  // Уже embed
  if (u.includes('/embed/')) return u;
  // youtu.be/xxx
  const short = u.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  // youtube.com/watch?v=xxx
  const watch = u.match(/(?:v=)([a-zA-Z0-9_-]+)/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  return u;
}
