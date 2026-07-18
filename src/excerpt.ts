export function extractExcerpt(content: string, maxLength = 100): string | null {
  let text = content.replace(/^---[\s\S]*?---\n*/, '');
  text = text.replace(/!\[\[.*?\]\]/g, '');
  text = text.replace(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/g, '$1');
  text = text.replace(/^#{1,6}\s+/gm, '');
  text = text.replace(/[*_~`]+/g, '');
  text = text.replace(/={2,}/g, '');
  text = text.replace(/^>\s?/gm, '');
  text = text.replace(/^\s*[-*+]\s/gm, '');
  text = text.replace(/\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();
  if (!text) return null;
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

export function renderExcerptTemplate(
  template: string,
  date: string,
  year: number,
  frontmatter: Record<string, unknown>,
  body: string | null,
): string | null {
  let result = template
    .replace(/\{body\}/g, body || '')
    .replace(/\{year\}/g, String(year))
    .replace(/\{date\}/g, date);
  for (const [key, value] of Object.entries(frontmatter)) {
    if (typeof value !== 'string' && typeof value !== 'number') continue;
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(`\\{${escapedKey}\\}`, 'g'), String(value));
  }
  return result.trim() || null;
}
