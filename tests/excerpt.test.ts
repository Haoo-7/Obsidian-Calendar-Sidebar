import { describe, expect, it } from 'vitest';
import { extractExcerpt, renderExcerptTemplate } from '../src/excerpt';

describe('excerpt utilities', () => {
  it('removes frontmatter and markdown syntax', () => {
    expect(extractExcerpt('---\ntags: x\n---\n# Hello\n![[photo.jpg]]\nA **short** note.')).toBe('Hello A short note.');
  });

  it('escapes frontmatter keys when rendering templates', () => {
    expect(renderExcerptTemplate('{mood+today} {body}', '2026-07-18', 2026, { 'mood+today': 'good' }, 'text')).toBe('good text');
  });
});
