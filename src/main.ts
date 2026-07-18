import LegacyPlugin from '../main.js';
import { formatDate, matchesDatePrefixedImage, parseDiaryDate } from './date-utils';
import { extractExcerpt, renderExcerptTemplate } from './excerpt';
import { migrateCompatibleSnapshot, weatherConfigKey } from './weather-cache';
import { renderExifTooltip } from './exif-tooltip';

declare const module: { exports: unknown };

// The current release entry remains the compatibility layer while the tested
// core is migrated incrementally into TypeScript modules.
const core = {
  formatDate,
  matchesDatePrefixedImage,
  parseDiaryDate,
  extractExcerpt,
  renderExcerptTemplate,
  migrateCompatibleSnapshot,
  weatherConfigKey,
  renderExifTooltip,
};

(LegacyPlugin as unknown as { core?: typeof core }).core = core;
module.exports = LegacyPlugin;
