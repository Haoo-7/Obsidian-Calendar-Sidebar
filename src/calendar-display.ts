export interface CalendarDisplaySettings {
  showCalendarMood?: boolean;
  showCalendarWeather?: boolean;
}

/** Missing fields remain visible so older plugin data keeps its current UI. */
export function shouldShowCalendarMood(settings: CalendarDisplaySettings = {}): boolean {
  return settings.showCalendarMood !== false;
}

export function shouldShowCalendarWeather(settings: CalendarDisplaySettings = {}): boolean {
  return settings.showCalendarWeather !== false;
}
