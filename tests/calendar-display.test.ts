import { describe, expect, it } from 'vitest';
import { shouldShowCalendarMood, shouldShowCalendarWeather } from '../src/calendar-display';

describe('calendar display settings', () => {
  it('keeps both displays visible for legacy settings without the new fields', () => {
    expect(shouldShowCalendarMood({})).toBe(true);
    expect(shouldShowCalendarWeather({})).toBe(true);
  });

  it('hides only the selected calendar display', () => {
    expect(shouldShowCalendarMood({ showCalendarMood: false, showCalendarWeather: true })).toBe(false);
    expect(shouldShowCalendarWeather({ showCalendarMood: true, showCalendarWeather: false })).toBe(false);
    expect(shouldShowCalendarMood({ showCalendarMood: true, showCalendarWeather: false })).toBe(true);
  });
});
