import { describe, expect, it } from 'vitest';
import { extractExcerpt, isGenericJournalTitle, renderExcerptTemplate } from '../src/excerpt';

describe('excerpt utilities', () => {
  it('removes frontmatter and markdown syntax', () => {
    expect(extractExcerpt('---\ntags: x\n---\n# Hello\n![[photo.jpg]]\nA **short** note.')).toBe('Hello A short note.');
  });

  it('escapes frontmatter keys when rendering templates', () => {
    expect(renderExcerptTemplate('{mood+today} {body}', '2026-07-18', 2026, { 'mood+today': 'good' }, 'text')).toBe('good text');
  });

  it('removes code, tasks, navigation and prefers Freewrite text', () => {
    const content = `---\ntags: test\n---\n# Daily Note\n\`\`\`dataviewjs\ndv.list([])\n\`\`\`\n- [ ] hidden task\n## Freewrite\nA natural paragraph for the timeline.\n## Tasks\n- [x] another task`;
    expect(extractExcerpt(content)).toBe('A natural paragraph for the timeline.');
    expect(isGenericJournalTitle('Daily Note', '2026-07-18')).toBe(true);
    expect(isGenericJournalTitle('A real title', '2026-07-18')).toBe(false);
  });

  it('handles icon headings and calendar navigation from daily notes', () => {
    const content = `---\ndate: 2026-07-18\n---\n## [[2026]] / [[2026-Q3|Q3]] / [[2026-07|July]] / [[2026-W29|Week 29]]\n# Daily Note\n##### ❮ [[2026-07-17]] | 2026-07-18 | [[2026-07-19]] ❯\n---\n### 📕Freewrite\n\nA natural paragraph with the real entry.\n\n### 📝 Thino\n- [ ] hidden task`;
    expect(extractExcerpt(content)).toBe('A natural paragraph with the real entry.');
  });

  it('does not fall back to task sections when Freewrite is empty', () => {
    const content = `# Daily Note\n### 📕Freewrite\n\n### 📝 Thino\n- [ ] hidden task\n### ⚛️Habits`;
    expect(extractExcerpt(content)).toBeNull();
  });
});
