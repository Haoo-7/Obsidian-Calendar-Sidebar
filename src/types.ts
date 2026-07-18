export type WeatherUnits = 'metric' | 'imperial';

export interface WeatherSettings {
  weatherLatitude: string | number;
  weatherLongitude: string | number;
  weatherUnits: WeatherUnits | string;
  weatherTimezone?: string;
}

export interface WeatherSnapshot {
  date?: string;
  fetchedAt?: string;
  cachedAt?: string;
  latitude?: number | string;
  longitude?: number | string;
  units?: WeatherUnits | string;
  configKey?: string;
  location?: string;
  [key: string]: unknown;
}

export interface ExifField {
  key: string;
  value: string;
}
