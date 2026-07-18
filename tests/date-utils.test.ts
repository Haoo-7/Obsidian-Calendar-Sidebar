import { describe, expect, it } from 'vitest';
import { formatDate, matchesDatePrefixedImage, parseDiaryDate } from '../src/date-utils';

describe('date utilities', () => {
  it('accepts valid diary dates and rejects impossible dates', () => {
    expect(parseDiaryDate('2024-02-29.md')?.date).toBe('2024-02-29');
    expect(parseDiaryDate('2023-02-29.md')).toBeNull();
    expect(parseDiaryDate('2024-02-30.md')).toBeNull();
  });

  it('formats local dates without changing the calendar day', () => {
    expect(formatDate(new Date(2026, 6, 18))).toBe('2026-07-18');
  });

  it('checks date prefixes against the image basename', () => {
    expect(matchesDatePrefixedImage('Assets/2026-07-18_photo.jpg', '2026-07-18')).toBe(true);
    expect(matchesDatePrefixedImage('Assets/other-2026-07-18.jpg', '2026-07-18')).toBe(false);
  });
});
