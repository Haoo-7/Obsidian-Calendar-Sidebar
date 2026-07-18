import { describe, expect, it } from 'vitest';
import { formatJournalDate, getDisplayLanguage, moodLabel, t } from '../src/i18n';

describe('display language', () => {
  it('migrates weatherLanguage and localizes dates and mood labels', () => {
    expect(getDisplayLanguage({ weatherLanguage: 'zh' })).toBe('zh');
    expect(getDisplayLanguage({ weatherLanguage: 'en' })).toBe('en');
    expect(t({ displayLanguage: 'zh' }, 'searchJournal')).toBe('搜索日记');
    expect(t({ displayLanguage: 'en' }, 'searchJournal')).toBe('Search journal');
    expect(moodLabel({ displayLanguage: 'zh' }, 2)).toBe('很好');
    expect(formatJournalDate('2026-07-18', { displayLanguage: 'zh' })).toContain('7月18日');
  });
});
